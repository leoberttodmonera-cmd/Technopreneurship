import { useState } from 'react';
import { login, logout, registerAccount } from '../../data/api.js';
function AccountPanel({ user, onAuthChange }) {
  const [mode, setMode] = useState('login'); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    const form = new FormData(event.currentTarget); const values = Object.fromEntries(form.entries());
    try {
      const nextUser = mode === 'register' ? await registerAccount(values) : await login(values);
      onAuthChange(nextUser);
    } catch (problem) { setError(problem.message); } finally { setBusy(false); }
  }
  async function signOut() { await logout(); onAuthChange(null); }
  if (user) return <section className="page-section" aria-labelledby="account-title"><div className="page-heading"><p className="eyebrow">ACCOUNT · SIGNED IN</p><h1 id="account-title">Your account</h1><p>Signed in to this local learning prototype.</p></div><article className="account-card"><div className="account-avatar" aria-hidden="true">{user.displayName.slice(0,1).toUpperCase()}</div><div><span className="demo-pill">{user.role.toUpperCase()} · LOCAL DEMO</span><h2>{user.displayName}</h2><p>{user.email}{user.departmentId ? ` · Department: ${user.departmentId}` : ''}</p><button type="button" className="text-button" onClick={signOut}>Sign out</button></div></article><p className="form-note">This account system is for local prototype learning only. Use fictional data.</p></section>;
  return <section className="page-section" aria-labelledby="account-title"><div className="page-heading"><p className="eyebrow">LOCAL ACCOUNT MODULE</p><h1 id="account-title">{mode === 'login' ? 'Sign in' : 'Create a student account'}</h1><p>Student registration is open in this local demo. Staff accounts are seeded for testing and cannot be self-registered.</p></div><div className="account-layout"><form className="ticket-form auth-form" onSubmit={submit}>
    {mode === 'register' && <label>Display name<input name="displayName" required minLength="2" maxLength="80" autoComplete="name" /></label>}
    <label>Email<input name="email" type="email" required autoComplete="username" placeholder="student@example.test" /></label>
    <label>Password<input name="password" type="password" required minLength="10" maxLength="128" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
    {error && <p className="state-message state-error" role="alert">{error}</p>}<button className="button-primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    <button type="button" className="text-button mode-toggle" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'New student? Create an account' : 'Already registered? Sign in'}</button>
  </form><article className="account-card account-next"><div><span className="demo-pill">FICTIONAL TEST ACCOUNTS</span><h2>Quick demo logins</h2><p><strong>Student</strong><br />student@example.test<br />StudentDemo123!</p><p><strong>Office staff</strong><br />staff@example.test<br />StaffDemo123!</p><p>These credentials exist only in the local demo database. Change/remove them before sharing any future version.</p></div></article></div></section>;
}
export default AccountPanel;
