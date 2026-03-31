const renderCards = (products) =>
  products
    .map(
      (product) => `
      <div class="menu-card">
        <div class="menu-thumb"></div>
        <div class="menu-info">
          <p class="menu-name">${product.name || 'Item'}</p>
          <p class="menu-meta">$${Number(product.price || 0).toFixed(2)}</p>
        </div>
        <button class="ghost mini" data-action="add-to-cart" data-id="${product.id}">Add</button>
      </div>
    `,
    )
    .join('');

export const menuPage = ({ products = [], status = '' } = {}) => `
<section class="section" id="menu">
  <div class="section-head">
    <h2>Menu Page</h2>
    <p>Browse categories and trending dishes.</p>
  </div>
  <div class="menu-layout">
    <aside class="menu-filters">
      <h3>Filters</h3>
      <div class="filter-group">
        <p class="filter-title">Category</p>
        <label><input type="checkbox" /> Pizza</label>
        <label><input type="checkbox" /> Drinks</label>
        <label><input type="checkbox" /> Bowls</label>
        <label><input type="checkbox" /> Desserts</label>
      </div>
      <button class="ghost" data-action="reload-products">Reload</button>
    </aside>
    <div class="menu-content">
      <div class="menu-tabs">
        <span class="chip active">Popular</span>
        <span class="chip">New</span>
        <span class="chip">Veg</span>
        <span class="chip">Combos</span>
      </div>
      <p class="menu-status">${status}</p>
      <div class="menu-grid">
        ${renderCards(products)}
      </div>
    </div>
  </div>
</section>
`;
