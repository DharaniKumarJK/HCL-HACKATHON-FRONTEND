export const loginPage = ({ mode = 'login', status = '' } = {}) => {
  const isRegister = mode === 'register';
  const registerFields = isRegister
    ? `
      <label class="field">
        <span>Name</span>
        <input id="name" type="text" placeholder="Your name" />
      </label>
      <label class="field">
        <span>Phone Number</span>
        <input id="phoneNumber" type="text" placeholder="Optional" />
      </label>
      <label class="field">
        <span>Role</span>
        <select id="role">
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </label>
    `
    : '';

  return `
<section class="section login" id="login">
  <div class="section-head">
    <h2>${isRegister ? 'Register Page' : 'Login Page'}</h2>
    <p>Access your account or create a new one.</p>
  </div>
  <div class="login-card">
    <div class="login-visual">
      <div class="plate"></div>
    </div>
    <form class="login-form" id="loginForm">
      <div class="form-tabs">
        <button type="button" class="tab ${mode === 'login' ? 'active' : ''}" data-action="set-mode" data-mode="login">Login</button>
        <button type="button" class="tab ${mode === 'register' ? 'active' : ''}" data-action="set-mode" data-mode="register">Register</button>
      </div>
      ${registerFields}
      <label class="field">
        <span>Email</span>
        <input id="email" type="email" placeholder="you@email.com" />
      </label>
      <label class="field">
        <span>Password</span>
        <input id="password" type="password" placeholder="Password" />
      </label>
      <p class="form-status">${status}</p>
      <div class="form-actions">
        <button class="cta" type="button" data-action="submit-auth">Confirm</button>
        <button class="ghost" type="button" data-action="reset-auth">Cancel</button>
      </div>
    </form>
  </div>
</section>
`;
};
