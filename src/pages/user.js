export const userPage = ({ user } = {}) => `
<section class="section dashboard">
  <div class="section-head">
    <h2>User Dashboard</h2>
    <p>Welcome back${user?.name ? `, ${user.name}` : ''}. Ready to order?</p>
  </div>
  <div class="dashboard-grid">
    <div class="dashboard-card">
      <h3>Quick Order</h3>
      <p>Jump straight to your favorites.</p>
      <button class="cta" data-route="/menu">Browse menu</button>
    </div>
    <div class="dashboard-card">
      <h3>Saved Items</h3>
      <p>Reorder from your most loved picks.</p>
      <button class="ghost">View saved</button>
    </div>
    <div class="dashboard-card">
      <h3>Order History</h3>
      <p>Track recent deliveries.</p>
      <button class="ghost">View history</button>
    </div>
  </div>
</section>
`;
