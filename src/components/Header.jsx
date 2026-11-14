function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="MPC SAFARI home">
        <span className="brand-mark">S</span>
        <span className="brand-copy"><b>MPC <strong>SAFARI</strong></b><small>CAMPUS SERVICES HUB · CONCEPT</small></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#services">Services</a>
        <a href="#announcements">Updates</a>
        <a href="#about">About</a>
      </nav>
      <button className="sign-in-button" type="button" disabled title="Authentication is not part of this first local data/API increment">Sign in <span aria-hidden="true">↗</span></button>
    </header>
  );
}

export default Header;
