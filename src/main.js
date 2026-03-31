import './style.css'
import { createClient } from './modules/client.js'
import { login, register } from './modules/auth.js'
import { listProducts } from './modules/products.js'
import { listUsers } from './modules/users.js'
import { listOrders } from './modules/orders.js'

document.querySelector('#app').innerHTML = `
<div class="page">
  <header class="topbar">
    <div class="brand">
      <span class="brand-mark"></span>
      <div>
        <p class="brand-title">CraveCart</p>
        <p class="brand-subtitle">API Explorer</p>
      </div>
    </div>
    <nav class="nav">
      <a href="#overview">Overview</a>
      <a href="#console">Console</a>
      <a href="#auth">Auth</a>
      <a href="#live-data">Live Data</a>
      <a href="#resources">Resources</a>
      <a href="#schemas">Schemas</a>
    </nav>
    <button class="pill">JWT Required</button>
  </header>

  <section id="overview" class="hero">
    <div class="hero-copy">
      <p class="eyebrow">OpenAPI 3.1 · v1</p>
      <h1>Design, test, and ship with the CraveCart API.</h1>
      <p class="lead">
        A focused front door for your commerce services: authentication, products, orders,
        payments, inventory, loyalty, and more. Everything below maps to the backend
        contract you shared.
      </p>
      <div class="hero-actions">
        <div class="url-card">
          <p class="label">Base URL</p>
          <p class="url">http://localhost:8080</p>
        </div>
        <div class="status-card">
          <p class="label">Security</p>
          <p class="value">Bearer JWT</p>
        </div>
      </div>
    </div>
    <div class="hero-panel">
      <div class="panel-header">
        <p class="panel-title">Quick Primer</p>
        <p class="panel-subtitle">First calls to make</p>
      </div>
      <div class="panel-list">
        <div class="endpoint">
          <span class="method post">POST</span>
          <div>
            <p class="path">/api/auth/register</p>
            <p class="summary">Create a user and receive a JWT.</p>
          </div>
        </div>
        <div class="endpoint">
          <span class="method post">POST</span>
          <div>
            <p class="path">/api/auth/login</p>
            <p class="summary">Login and refresh a JWT.</p>
          </div>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <div>
            <p class="path">/api/products</p>
            <p class="summary">Browse the current catalog.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="console" class="section">
    <div class="section-head">
      <h2>Live Console</h2>
      <p>Connect to the CRAVECART1 backend and store a JWT for authenticated calls.</p>
    </div>
    <div class="console">
      <article class="card">
        <h3>Connection</h3>
        <label class="field">
          <span>Base URL</span>
          <input id="baseUrl" type="text" value="http://localhost:8080" />
        </label>
        <label class="field">
          <span>JWT</span>
          <textarea id="token" rows="4" placeholder="Paste token here"></textarea>
        </label>
        <button id="saveConfig" class="action">Save config</button>
        <p id="configStatus" class="status"></p>
      </article>
      <article class="card">
        <h3>Login</h3>
        <label class="field">
          <span>Email</span>
          <input id="loginEmail" type="email" placeholder="you@example.com" />
        </label>
        <label class="field">
          <span>Password</span>
          <input id="loginPassword" type="password" placeholder="Password" />
        </label>
        <button id="loginBtn" class="action">Login</button>
        <p id="loginStatus" class="status"></p>
        <pre id="authOutput" class="output"></pre>
      </article>
      <article class="card">
        <h3>Register</h3>
        <label class="field">
          <span>Name</span>
          <input id="registerName" type="text" placeholder="Full name" />
        </label>
        <label class="field">
          <span>Email</span>
          <input id="registerEmail" type="email" placeholder="you@example.com" />
        </label>
        <label class="field">
          <span>Password</span>
          <input id="registerPassword" type="password" placeholder="Password" />
        </label>
        <label class="field">
          <span>Phone</span>
          <input id="registerPhone" type="text" placeholder="Optional" />
        </label>
        <label class="field">
          <span>Role</span>
          <select id="registerRole">
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
        <button id="registerBtn" class="action">Register</button>
        <p id="registerStatus" class="status"></p>
      </article>
    </div>
  </section>

  <section id="auth" class="section">
    <div class="section-head">
      <h2>Authentication</h2>
      <p>Register and login endpoints that return `AuthResponse` with token + user.</p>
    </div>
    <div class="grid">
      <article class="card">
        <div class="card-head">
          <span class="method post">POST</span>
          <p class="path">/api/auth/register</p>
        </div>
        <p class="summary">Create a new account.</p>
        <p class="meta">Body: `RegisterRequest` (name, email, password, phoneNumber, role).</p>
        <p class="meta">201: `AuthResponse`.</p>
      </article>
      <article class="card">
        <div class="card-head">
          <span class="method post">POST</span>
          <p class="path">/api/auth/login</p>
        </div>
        <p class="summary">Authenticate an existing user.</p>
        <p class="meta">Body: `LoginRequest` (email, password).</p>
        <p class="meta">200: `AuthResponse`.</p>
      </article>
    </div>
  </section>

  <section id="live-data" class="section">
    <div class="section-head">
      <h2>Live Data</h2>
      <p>Run real requests against the backend once it is running locally.</p>
    </div>
    <div class="grid">
      <article class="card">
        <div class="card-head">
          <span class="method get">GET</span>
          <p class="path">/api/products</p>
        </div>
        <button id="loadProducts" class="action">Load products</button>
        <pre id="productsOutput" class="output"></pre>
      </article>
      <article class="card">
        <div class="card-head">
          <span class="method get">GET</span>
          <p class="path">/api/users</p>
        </div>
        <button id="loadUsers" class="action">Load users</button>
        <pre id="usersOutput" class="output"></pre>
      </article>
      <article class="card">
        <div class="card-head">
          <span class="method get">GET</span>
          <p class="path">/api/orders</p>
        </div>
        <button id="loadOrders" class="action">Load orders</button>
        <pre id="ordersOutput" class="output"></pre>
      </article>
    </div>
  </section>

  <section id="resources" class="section">
    <div class="section-head">
      <h2>Resource Groups</h2>
      <p>Every resource supports list + create, plus detail endpoints for get/update/delete.</p>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Users</h3>
        <p class="meta">Schemas: `UserResponse`, `UserUpdateRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/users</p><p class="summary">List users.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/users/{id}</p><p class="summary">Fetch a user by id.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/users/{id}</p><p class="summary">Update name, phone, role.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/users/{id}</p><p class="summary">Remove a user.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Products</h3>
        <p class="meta">Schemas: `Product`, `ProductRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/products</p><p class="summary">List products.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/products</p><p class="summary">Create a product.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/products/{id}</p><p class="summary">Fetch product details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/products/{id}</p><p class="summary">Update a product.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/products/{id}</p><p class="summary">Remove a product.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Orders</h3>
        <p class="meta">Schemas: `Order`, `OrderRequest`, `OrderItemRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/orders</p><p class="summary">List orders.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/orders</p><p class="summary">Create an order.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/orders/{id}</p><p class="summary">Fetch order details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/orders/{id}</p><p class="summary">Update order items.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/orders/{id}</p><p class="summary">Cancel an order.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Payments</h3>
        <p class="meta">Schemas: `Payment`, `PaymentRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/payments</p><p class="summary">List payments.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/payments</p><p class="summary">Create a payment record.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/payments/{id}</p><p class="summary">Fetch payment details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/payments/{id}</p><p class="summary">Update payment status.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/payments/{id}</p><p class="summary">Remove a payment.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Inventory</h3>
        <p class="meta">Schemas: `Inventory`, `InventoryRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/inventory</p><p class="summary">List inventory items.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/inventory</p><p class="summary">Create stock record.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/inventory/{id}</p><p class="summary">Fetch inventory details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/inventory/{id}</p><p class="summary">Update stock quantity.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/inventory/{id}</p><p class="summary">Remove inventory item.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Coupons</h3>
        <p class="meta">Schemas: `Coupon`, `CouponRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/coupons</p><p class="summary">List coupons.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/coupons</p><p class="summary">Create a coupon.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/coupons/{id}</p><p class="summary">Fetch coupon details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/coupons/{id}</p><p class="summary">Update a coupon.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/coupons/{id}</p><p class="summary">Remove a coupon.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Categories</h3>
        <p class="meta">Schemas: `Category`, `CategoryRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/categories</p><p class="summary">List categories.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/categories</p><p class="summary">Create a category.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/categories/{id}</p><p class="summary">Fetch category details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/categories/{id}</p><p class="summary">Update a category.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/categories/{id}</p><p class="summary">Remove a category.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Carts</h3>
        <p class="meta">Schemas: `Cart`, `CartRequest`, `CartItemRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/carts</p><p class="summary">List carts.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/carts</p><p class="summary">Create a cart.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/carts/{id}</p><p class="summary">Fetch cart details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/carts/{id}</p><p class="summary">Update cart items.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/carts/{id}</p><p class="summary">Remove a cart.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Brands</h3>
        <p class="meta">Schemas: `Brand`, `BrandRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/brands</p><p class="summary">List brands.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/brands</p><p class="summary">Create a brand.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/brands/{id}</p><p class="summary">Fetch brand details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/brands/{id}</p><p class="summary">Update a brand.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/brands/{id}</p><p class="summary">Remove a brand.</p></div></div>
      </div>
    </div>

    <div class="resource">
      <div class="resource-head">
        <h3>Loyalty Points</h3>
        <p class="meta">Schemas: `LoyaltyPoints`, `LoyaltyPointsRequest`</p>
      </div>
      <div class="resource-body">
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/loyalty-points</p><p class="summary">List loyalty point records.</p></div></div>
        <div class="endpoint"><span class="method post">POST</span><div><p class="path">/api/loyalty-points</p><p class="summary">Create loyalty points.</p></div></div>
        <div class="endpoint"><span class="method get">GET</span><div><p class="path">/api/loyalty-points/{id}</p><p class="summary">Fetch points details.</p></div></div>
        <div class="endpoint"><span class="method put">PUT</span><div><p class="path">/api/loyalty-points/{id}</p><p class="summary">Update points tally.</p></div></div>
        <div class="endpoint"><span class="method delete">DELETE</span><div><p class="path">/api/loyalty-points/{id}</p><p class="summary">Remove points record.</p></div></div>
      </div>
    </div>
  </section>

  <section id="schemas" class="section">
    <div class="section-head">
      <h2>Schema Highlights</h2>
      <p>Key fields to include when wiring frontend forms.</p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>AuthResponse</h3>
        <ul>
          <li>token (string)</li>
          <li>user: UserResponse</li>
        </ul>
      </article>
      <article class="card">
        <h3>ProductRequest</h3>
        <ul>
          <li>name (string)</li>
          <li>description (string)</li>
          <li>price (number)</li>
          <li>categoryId, brandId (int64)</li>
          <li>isAvailable (boolean)</li>
        </ul>
      </article>
      <article class="card">
        <h3>OrderRequest</h3>
        <ul>
          <li>userId (int64)</li>
          <li>items: productId, quantity, price</li>
        </ul>
      </article>
      <article class="card">
        <h3>PaymentRequest</h3>
        <ul>
          <li>orderId (int64)</li>
          <li>paymentMethod: CARD | CASH | WALLET | BANK_TRANSFER</li>
          <li>paymentStatus: PENDING | PAID | FAILED | REFUNDED</li>
        </ul>
      </article>
      <article class="card">
        <h3>CouponRequest</h3>
        <ul>
          <li>code (string)</li>
          <li>discountPercentage (int32)</li>
          <li>validFrom, validTo (date-time)</li>
          <li>isActive (boolean)</li>
        </ul>
      </article>
      <article class="card">
        <h3>InventoryRequest</h3>
        <ul>
          <li>productId (int64)</li>
          <li>stockQuantity (int32)</li>
        </ul>
      </article>
    </div>
  </section>

  <footer class="footer">
    <p>CraveCart API Explorer · Built for the HCL Hackathon frontend.</p>
  </footer>
</div>
`

const state = {
  baseUrl: 'http://localhost:8080',
  token: '',
};

const byId = (id) => document.getElementById(id);

const setStatus = (el, message, kind = 'info') => {
  if (!el) {
    return;
  }
  el.textContent = message;
  el.className = `status ${kind}`;
};

const setOutput = (el, payload) => {
  if (!el) {
    return;
  }
  if (payload === undefined || payload === null) {
    el.textContent = 'No data.';
    return;
  }
  el.textContent = JSON.stringify(payload, null, 2);
};

const formatError = (error) => {
  if (!error) {
    return 'Unknown error.';
  }
  if (error.payload) {
    return typeof error.payload === 'string'
      ? error.payload
      : JSON.stringify(error.payload, null, 2);
  }
  return error.message || 'Request failed.';
};

let client = createClient(state);

const refreshClient = () => {
  client = createClient(state);
};

const baseUrlInput = byId('baseUrl');
const tokenInput = byId('token');
const saveConfigBtn = byId('saveConfig');
const configStatus = byId('configStatus');

saveConfigBtn.addEventListener('click', () => {
  state.baseUrl = baseUrlInput.value.trim() || state.baseUrl;
  state.token = tokenInput.value.trim();
  refreshClient();
  setStatus(configStatus, 'Config saved.', 'success');
});

const loginBtn = byId('loginBtn');
const loginStatus = byId('loginStatus');
const authOutput = byId('authOutput');

loginBtn.addEventListener('click', async () => {
  const email = byId('loginEmail').value.trim();
  const password = byId('loginPassword').value;

  setStatus(loginStatus, 'Logging in...', 'info');
  try {
    const response = await login(client, { email, password });
    setOutput(authOutput, response);
    state.token = response?.token || '';
    tokenInput.value = state.token;
    refreshClient();
    setStatus(loginStatus, 'Login succeeded.', 'success');
  } catch (error) {
    setStatus(loginStatus, formatError(error), 'error');
  }
});

const registerBtn = byId('registerBtn');
const registerStatus = byId('registerStatus');

registerBtn.addEventListener('click', async () => {
  const payload = {
    name: byId('registerName').value.trim(),
    email: byId('registerEmail').value.trim(),
    password: byId('registerPassword').value,
    phoneNumber: byId('registerPhone').value.trim() || undefined,
    role: byId('registerRole').value,
  };

  setStatus(registerStatus, 'Registering...', 'info');
  try {
    const response = await register(client, payload);
    setOutput(authOutput, response);
    state.token = response?.token || state.token;
    tokenInput.value = state.token;
    refreshClient();
    setStatus(registerStatus, 'Registration succeeded.', 'success');
  } catch (error) {
    setStatus(registerStatus, formatError(error), 'error');
  }
});

const loadProductsBtn = byId('loadProducts');
const productsOutput = byId('productsOutput');

loadProductsBtn.addEventListener('click', async () => {
  setOutput(productsOutput, 'Loading...');
  try {
    const response = await listProducts(client);
    setOutput(productsOutput, response);
  } catch (error) {
    setOutput(productsOutput, formatError(error));
  }
});

const loadUsersBtn = byId('loadUsers');
const usersOutput = byId('usersOutput');

loadUsersBtn.addEventListener('click', async () => {
  setOutput(usersOutput, 'Loading...');
  try {
    const response = await listUsers(client);
    setOutput(usersOutput, response);
  } catch (error) {
    setOutput(usersOutput, formatError(error));
  }
});

const loadOrdersBtn = byId('loadOrders');
const ordersOutput = byId('ordersOutput');

loadOrdersBtn.addEventListener('click', async () => {
  setOutput(ordersOutput, 'Loading...');
  try {
    const response = await listOrders(client);
    setOutput(ordersOutput, response);
  } catch (error) {
    setOutput(ordersOutput, formatError(error));
  }
});
