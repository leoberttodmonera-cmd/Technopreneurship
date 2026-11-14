const pages = [
  ['home', 'Home'], ['services', 'Services'], ['departments', 'Departments'],
  ['updates', 'Updates'], ['tickets', 'Tickets'], ['account', 'Account'],
];
function Header({ activePage, onNavigate, user }) {
  const visiblePages = user?.role === 'staff' ? [...pages, ['staff', 'Office dashboard']] : pages;
  return <header className="site-header">
    <button className="brand brand-button" type="button" onClick={() => onNavigate('home')} aria-label="MPC SAFARI home">
      <span className="brand-mark">S</span><span className="brand-copy"><b>MPC <strong>SAFARI</strong></b><small>CAMPUS SERVICES HUB · CONCEPT</small></span>
    </button>
    <nav className="main-nav" aria-label="Main navigation">{visiblePages.map(([id, label]) => <button key={id} type="button" className={activePage === id ? 'nav-link active' : 'nav-link'} aria-current={activePage === id ? 'page' : undefined} onClick={() => onNavigate(id)}>{label}</button>)}</nav>
    <button className="sign-in-button" type="button" onClick={() => onNavigate('account')}>{user ? user.displayName.split(' ')[0] : 'Sign in'} <span aria-hidden="true">↗</span></button>
  </header>;
}
export default Header;
