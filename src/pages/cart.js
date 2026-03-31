const renderCartItems = (items) =>
  items
    .map(
      (item) => `
      <div class="cart-item">
        <div class="thumb"></div>
        <div class="cart-info">
          <p class="cart-name">${item.name}</p>
          <p class="cart-meta">Qty ${item.qty} · $${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <button class="ghost" data-action="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `,
    )
    .join('');

export const cartPage = ({ items = [], total = 0, status = '' } = {}) => `
<section class="section" id="cart">
  <div class="section-head">
    <h2>Cart Page</h2>
    <p>Review items and checkout.</p>
  </div>
  <div class="cart-layout">
    <aside class="cart-side">
      <button class="side-link active" data-action="side-link">Menu</button>
      <button class="side-link" data-action="side-link">History</button>
      <button class="side-link" data-action="side-link">Offers</button>
    </aside>
    <div class="cart-content">
      <div class="cart-header">
        <h3>My Cart</h3>
        <button class="ghost" data-route="/menu">Browse</button>
      </div>
      <p class="cart-status">${status}</p>
      ${items.length ? renderCartItems(items) : '<p class="cart-empty">Your cart is empty.</p>'}
      <div class="cart-footer">
        <p>Total: $${total.toFixed(2)}</p>
        <button class="cta" data-action="checkout">Checkout</button>
      </div>
    </div>
  </div>
</section>
`;
