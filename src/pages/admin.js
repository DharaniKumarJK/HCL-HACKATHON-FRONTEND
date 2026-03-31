export const adminPage = ({ user } = {}) => `
<section class="section dashboard">
  <div class="section-head">
    <h2>Admin Dashboard</h2>
    <p>Welcome back${user?.name ? `, ${user.name}` : ''}. Manage orders, menus, and users.</p>
  </div>
  <div class="dashboard-grid">
    <div class="dashboard-card">
      <h3>Orders</h3>
      <p>Track and update active orders.</p>
      <button class="ghost" data-route="/cart">View orders</button>
    </div>
    <div class="dashboard-card">
      <h3>Menu</h3>
      <p>Update items, pricing, and availability.</p>
      <button class="ghost" data-route="/menu">Manage menu</button>
    </div>
    <div class="dashboard-card">
      <h3>Users</h3>
      <p>Review customer accounts and roles.</p>
      <button class="ghost" data-route="/login">Manage users</button>
    </div>
  </div>
</section>
`;
