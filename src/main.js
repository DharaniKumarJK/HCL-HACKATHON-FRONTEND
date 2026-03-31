import './style.css'
import { landingPage } from './pages/landing.js'
import { loginPage } from './pages/login.js'
import { menuPage } from './pages/menu.js'
import { cartPage } from './pages/cart.js'
import { adminPage } from './pages/admin.js'
import { userPage } from './pages/user.js'
import { listProducts, login, register } from './modules/api.js'

const routes = {
  '/landing': landingPage,
  '/login': loginPage,
  '/menu': menuPage,
  '/cart': cartPage,
  '/admin': adminPage,
  '/user': userPage,
};

const app = document.querySelector('#app');

const STORAGE_KEY = 'cravecart-state';

const defaultState = {
  baseUrl: 'http://localhost:8080',
  auth: { token: '', user: null },
  products: [],
  cart: [],
  ui: { authMode: 'login', authStatus: '', menuStatus: '', cartStatus: '' },
};

const loadState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultState, ...JSON.parse(stored) } : defaultState;
  } catch {
    return defaultState;
  }
};

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const state = loadState();

app.innerHTML = `
<div class="site">
  <header class="site-header">
    <div class="logo">
      <span class="logo-mark"></span>
      <div>
        <p class="logo-title">CRAVECART</p>
        <p class="logo-subtitle">Fresh Food Hub</p>
      </div>
    </div>
    <nav class="site-nav">
      <a class="nav-link" data-route="/landing" href="#/landing">Landing</a>
      <a class="nav-link" data-route="/menu" href="#/menu">Menu</a>
      <a class="nav-link" data-route="/cart" href="#/cart">Cart</a>
      <a class="nav-link" data-route="/login" href="#/login">Login</a>
    </nav>
    <button class="cta" data-route="/menu">Get Started</button>
  </header>

  <main id="pageContent" class="page-content"></main>
</div>
`;

const pageContent = document.getElementById('pageContent');

const setActiveLink = (route) => {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === route);
  });
};

const renderRoute = () => {
  const hash = window.location.hash.replace('#', '');
  const route = hash || '/landing';
  const view = routes[route] || landingPage;
  if (route === '/login') {
    pageContent.innerHTML = view({
      mode: state.ui.authMode,
      status: state.ui.authStatus,
    });
  } else if (route === '/admin' || route === '/user') {
    pageContent.innerHTML = view({
      user: state.auth.user,
    });
  } else if (route === '/menu') {
    pageContent.innerHTML = view({
      products: state.products,
      status: state.ui.menuStatus,
    });
  } else if (route === '/cart') {
    pageContent.innerHTML = view({
      items: state.cart,
      total: getCartTotal(),
      status: state.ui.cartStatus,
    });
  } else {
    pageContent.innerHTML = view();
  }
  setActiveLink(route);
};

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-route]');
  if (!target) {
    return;
  }
  const route = target.dataset.route;
  window.location.hash = route;
});

const getCartTotal = () =>
  state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

const syncProducts = async () => {
  state.ui.menuStatus = 'Loading menu...';
  renderRoute();
  try {
    const products = await listProducts(state.baseUrl);
    state.products = Array.isArray(products) ? products : [];
    state.ui.menuStatus = state.products.length ? '' : 'No items available.';
  } catch (error) {
    state.ui.menuStatus = 'Could not load menu from server.';
    state.products = state.products.length
      ? state.products
      : [
          { id: 1, name: 'Margherita Slice', price: 4.5 },
          { id: 2, name: 'Veggie Bowl', price: 6.25 },
          { id: 3, name: 'Choco Lava Cup', price: 4.2 },
        ];
  }
  saveState();
  renderRoute();
};

const addToCart = (id) => {
  const product = state.products.find((item) => String(item.id) === String(id));
  if (!product) {
    state.ui.menuStatus = 'Item not found.';
    renderRoute();
    return;
  }
  const existing = state.cart.find((item) => String(item.id) === String(id));
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name || 'Item',
      price: Number(product.price || 0),
      qty: 1,
    });
  }
  state.ui.cartStatus = 'Item added to cart.';
  saveState();
  renderRoute();
};

const removeFromCart = (id) => {
  state.cart = state.cart.filter((item) => String(item.id) !== String(id));
  state.ui.cartStatus = 'Item removed.';
  saveState();
  renderRoute();
};

const submitAuth = async () => {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const phoneNumber = document.getElementById('phoneNumber')?.value.trim();
  const role = document.getElementById('role')?.value || 'CUSTOMER';

  if (!email || !password) {
    state.ui.authStatus = 'Email and password are required.';
    renderRoute();
    return;
  }

  if (state.ui.authMode === 'register' && !name) {
    state.ui.authStatus = 'Name is required for registration.';
    renderRoute();
    return;
  }

  const formatError = (error) => {
    if (!error) {
      return 'Authentication failed.';
    }
    if (error.payload) {
      return typeof error.payload === 'string'
        ? error.payload
        : JSON.stringify(error.payload, null, 2);
    }
    return error.message || 'Authentication failed.';
  };

  state.ui.authStatus = 'Submitting...';
  renderRoute();
  try {
    const payload =
      state.ui.authMode === 'login'
        ? { email, password }
        : {
            name,
            email,
            password,
            phoneNumber: phoneNumber || null,
            role,
          };
    const response =
      state.ui.authMode === 'login'
        ? await login(state.baseUrl, payload)
        : await register(state.baseUrl, payload);
    state.auth = {
      token: response?.token || '',
      user: response?.user || null,
    };
    const resolvedRole =
      (state.auth.user?.role || role || 'CUSTOMER').toString().toUpperCase();
    state.ui.authStatus = 'Success.';
    window.location.hash = resolvedRole === 'ADMIN' ? '/admin' : '/user';
  } catch (error) {
    state.ui.authStatus = formatError(error);
  }
  saveState();
  renderRoute();
};

const resetAuth = () => {
  state.ui.authStatus = '';
  renderRoute();
};

document.addEventListener('click', (event) => {
  const actionTarget = event.target.closest('[data-action]');
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;
  if (action === 'set-mode') {
    state.ui.authMode = actionTarget.dataset.mode;
    state.ui.authStatus = '';
    renderRoute();
    return;
  }
  if (action === 'submit-auth') {
    submitAuth();
    return;
  }
  if (action === 'reset-auth') {
    resetAuth();
    return;
  }
  if (action === 'reload-products') {
    syncProducts();
    return;
  }
  if (action === 'add-to-cart') {
    addToCart(actionTarget.dataset.id);
    return;
  }
  if (action === 'remove-item') {
    removeFromCart(actionTarget.dataset.id);
    return;
  }
  if (action === 'checkout') {
    state.ui.cartStatus = 'Checkout is not connected yet.';
    renderRoute();
    return;
  }
  if (action === 'side-link') {
    document.querySelectorAll('.side-link').forEach((button) => {
      button.classList.toggle('active', button === actionTarget);
    });
  }
});

document.addEventListener('submit', (event) => {
  if (!event.target.matches('.login-form')) {
    return;
  }
  event.preventDefault();
  submitAuth();
});

window.addEventListener('hashchange', renderRoute);
renderRoute();

if (!state.products.length) {
  syncProducts();
}
