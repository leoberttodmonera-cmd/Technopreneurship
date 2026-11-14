import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import ServiceDirectory from '../features/campus-services/ServiceDirectory.jsx';
import AnnouncementList from '../features/announcements/AnnouncementList.jsx';
import { getAnnouncements, getServices } from '../data/api.js';
import '../styles/app.css';

function App() {
  const [servicesState, setServicesState] = useState({ status: 'loading', items: [], error: '' });
  const [announcementsState, setAnnouncementsState] = useState({ status: 'loading', items: [], error: '' });

  useEffect(() => {
    let active = true;
    Promise.all([getServices(), getAnnouncements()])
      .then(([services, announcements]) => {
        if (!active) return;
        setServicesState({ status: 'ready', items: services, error: '' });
        setAnnouncementsState({ status: 'ready', items: announcements, error: '' });
      })
      .catch((error) => {
        if (!active) return;
        setServicesState({ status: 'error', items: [], error: error.message });
        setAnnouncementsState({ status: 'error', items: [], error: error.message });
      });
    return () => { active = false; };
  }, []);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="pulse-dot" /> ONE HUB · MANY CAMPUS SERVICES</p>
            <h1>Find your way<br /><span>around campus.</span></h1>
            <p className="hero-description">A clear starting point for campus services, office information, and updates—designed as one shared student project.</p>
            <a className="button-primary" href="#services">Explore services <span aria-hidden="true">↓</span></a>
            <p className="hero-disclaimer">Student project concept · Not an official MPC service</p>
          </div>
          <div className="hero-visual" aria-label="Abstract blue campus technology illustration">
            <div className="visual-grid" />
            <div className="visual-orbit orbit-a" />
            <div className="visual-orbit orbit-b" />
            <div className="visual-core"><span>S</span><small>MPC<br />SAFARI</small></div>
            <div className="visual-chip chip-top"><span>⌖</span><div><b>Campus services</b><small>Find the right starting point</small></div></div>
            <div className="visual-chip chip-bottom"><span>↗</span><div><b>Clear information</b><small>Made for every visitor</small></div></div>
          </div>
        </section>

        <section className="quick-strip" aria-label="Project highlights">
          <div><strong>01</strong><span>Shared campus hub</span></div>
          <div><strong>∞</strong><span>Modular by design</span></div>
          <div><strong>DEMO</strong><span>Fictional sample content</span></div>
        </section>

        <ServiceDirectory state={servicesState} />
        <AnnouncementList state={announcementsState} />

        <section className="project-notice" id="about">
          <span className="notice-icon" aria-hidden="true">i</span>
          <p><strong>Project concept preview.</strong> Sample entries are fictional and are not verified MPC service information. This prototype is not an emergency, confidential complaint, or official transaction channel.</p>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#home">MPC <b>SAFARI</b></a>
        <span>Student project concept · Local development preview</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
