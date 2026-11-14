import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import ServiceDirectory from '../features/campus-services/ServiceDirectory.jsx';
import AnnouncementList from '../features/announcements/AnnouncementList.jsx';
import DepartmentDirectory from '../features/departments/DepartmentDirectory.jsx';
import TicketDesk from '../features/office-inquiries/TicketDesk.jsx';
import StudentFeed from '../features/student-feed/StudentFeed.jsx';
import AccountPanel from '../features/account/AccountPanel.jsx';
import StaffWorkspace from '../features/staff/StaffWorkspace.jsx';
import { getAnnouncements, getMe, getServices } from '../data/api.js';
import '../styles/app.css';

const initial = { status: 'loading', items: [], error: '' };
const cards = [
  ['services', '⌕', 'Campus services', 'Search fictional service information and office locations.'],
  ['departments', '⌖', 'Departments', 'Browse example offices and their service areas.'],
  ['updates', '↗', 'Campus updates', 'Read public and student announcements.'],
  ['tickets', '＋', 'Service tickets', 'Send a private ticket to its assigned office.'],
];
function Home({ services, announcements, onNavigate }) {
  return <>
    <section className="hero" id="home"><div className="hero-copy"><p className="eyebrow"><span className="pulse-dot" /> ONE HUB · MANY CAMPUS SERVICES</p><h1>Find your way<br /><span>around campus.</span></h1><p className="hero-description">A campus information hub prototype: browse services, departments, announcements, and private office inquiry workflows.</p><button className="button-primary" type="button" onClick={() => onNavigate('services')}>Explore services <span aria-hidden="true">→</span></button><p className="hero-disclaimer">Student project concept · Fictional sample content · Not an official MPC service</p></div>
      <div className="hero-visual" aria-label="Abstract blue campus technology illustration"><div className="visual-grid" /><div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" /><div className="visual-core"><span>S</span><small>MPC<br />SAFARI</small></div><div className="visual-chip chip-top"><span>⌖</span><div><b>Campus services</b><small>One place to explore</small></div></div><div className="visual-chip chip-bottom"><span>↗</span><div><b>Modular prototype</b><small>Learn one feature at a time</small></div></div></div>
    </section>
    <section className="quick-strip" aria-label="Project highlights"><div><strong>01</strong><span>Unified campus hub</span></div><div><strong>06</strong><span>Clickable modules</span></div><div><strong>DEMO</strong><span>Fictional local content</span></div></section>
    <section className="home-modules"><div className="section-heading"><div><p className="eyebrow">START EXPLORING</p><h2>Choose a module</h2><p className="section-subtitle">Each feature has its own folder so your team can learn and improve it independently.</p></div></div><div className="module-grid">{cards.map(([id, icon, title, description]) => <button className="module-card" key={id} type="button" onClick={() => onNavigate(id)}><span className="module-icon">{icon}</span><span><strong>{title}</strong><small>{description}</small></span><b aria-hidden="true">→</b></button>)}</div></section>
    <div className="home-preview"><ServiceDirectory state={{ status: services.status, items: services.items.slice(0, 3), error: services.error }} /><AnnouncementList state={announcements} /></div>
  </>;
}
function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(initial);
  const [announcements, setAnnouncements] = useState(initial);
  useEffect(() => {
    let active = true;
    getMe().then((currentUser) => { if (active) setUser(currentUser); }).catch(() => {});
    Promise.all([getServices(), getAnnouncements()]).then(([serviceItems, announcementItems]) => {
      if (!active) return;
      setServices({ status: 'ready', items: serviceItems, error: '' });
      setAnnouncements({ status: 'ready', items: announcementItems, error: '' });
    }).catch((error) => {
      if (!active) return;
      setServices({ status: 'error', items: [], error: error.message });
      setAnnouncements({ status: 'error', items: [], error: error.message });
    });
    return () => { active = false; };
  }, []);
  function navigate(nextPage) { setPage(nextPage); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  return <div className="site-shell"><Header activePage={page} onNavigate={navigate} user={user} /><main>
    {page === 'home' && <Home services={services} announcements={announcements} onNavigate={navigate} />}
    {page === 'services' && <ServiceDirectory state={services} />}
    {page === 'departments' && <DepartmentDirectory services={services.items} />}
    {page === 'updates' && <StudentFeed user={user} onSignIn={() => navigate('account')} />}
    {page === 'tickets' && <TicketDesk services={services.items} user={user} onSignIn={() => navigate('account')} />}
    {page === 'account' && <AccountPanel user={user} onAuthChange={setUser} />}
    {page === 'staff' && <StaffWorkspace user={user} />}
    <section className="project-notice"><span className="notice-icon" aria-hidden="true">i</span><p><strong>Local learning prototype.</strong> All accounts and content are fictional. This app is not MPC-approved or connected to campus systems. Do not enter real student information.</p></section>
  </main><footer className="site-footer"><button className="footer-brand" type="button" onClick={() => navigate('home')}>MPC <b>SAFARI</b></button><span>Local learning prototype · Not an official service</span><button className="footer-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></footer></div>;
}
export default App;
