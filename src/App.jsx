import { useMemo, useState } from "react";
import "./App.css";

const services = [
  {
    name: "Registrar",
    category: "Student services",
    description: "Enrollment, records, and document information.",
    label: "ACADEMIC",
    color: "blue",
  },
  {
    name: "Cashier",
    category: "Payments",
    description: "Payment office information and contact details.",
    label: "FINANCE",
    color: "violet",
  },
  {
    name: "Guidance Office",
    category: "Student support",
    description: "Learn about available support and how to reach the office.",
    label: "SUPPORT",
    color: "green",
  },
  {
    name: "IRGO",
    category: "Uniform services",
    description: "Uniform service information and office contact route.",
    label: "CAMPUS",
    color: "orange",
  },
  {
    name: "Campus Clinic",
    category: "Health services",
    description: "Find general clinic information and location details.",
    label: "WELLNESS",
    color: "pink",
  },
  {
    name: "Campus Locations",
    category: "Wayfinding",
    description: "Find campus buildings and service locations.",
    label: "EXPLORE",
    color: "cyan",
  },
];

const announcements = [
  {
    tag: "CAMPUS UPDATE",
    title: "Welcome to the campus services hub",
    date: "Demo announcement",
  },
  {
    tag: "PROJECT NOTE",
    title: "Service details in this preview are examples",
    date: "Fictional demo content",
  },
];

function App() {
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return services;

    return services.filter((service) =>
      `${service.name} ${service.category} ${service.description}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="MPC SAFARI home">
          <span className="brand-mark">S</span>
          <span className="brand-name">
            MPC <strong>SAFARI</strong>
            <small> CAMPUS SERVICES HUB · CONCEPT PREVIEW</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a className="active" href="#services">Services</a>
          <a href="#announcements">Updates</a>
          <a href="#about">About</a>
        </nav>

        <button className="sign-in" type="button" title="Sign-in is not connected yet">
          Sign in <span aria-hidden="true">↗</span>
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              A CLEARER WAY TO FIND CAMPUS SERVICES
            </div>

            <h1>
              Campus services,
                

              <span>within reach.</span>
            </h1>

            <p>
              Find service information, office updates, and the right place to
              start. One campus hub, designed to make information easier to navigate.
            </p>

            <a className="primary-button" href="#services">
              Explore services <span aria-hidden="true">↓</span>
            </a>

            <div className="hero-note">
              <span aria-hidden="true">✳</span>
              Student project concept · Not an official MPC service
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract blue technology artwork">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-core">
              <span className="core-symbol">S</span>
              <span className="core-caption">ONE CAMPUS  
MANY SERVICES</span>
            </div>
            <div className="float-card float-card-top">
              <span className="mini-icon">↗</span>
              <span><b>Find what you need</b><small>Service information</small></span>
            </div>
            <div className="float-card float-card-bottom">
              <span className="mini-icon">◎</span>
              <span><b>Stay in the loop</b><small>Campus announcements</small></span>
            </div>
            <div className="art-glow" />
          </div>
        </section>

        <section className="quick-stats" aria-label="Hub highlights">
          <div><strong>01</strong><span>One shared hub</span></div>
          <div><strong>06</strong><span>Example service areas</span></div>
          <div><strong>24/7</strong><span>Browse the demo anytime</span></div>
          <div className="stats-note">Fictional preview content</div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">EXPLORE THE HUB</div>
              <h2>What can we help you find?</h2>
              <p>Browse example campus service categories.</p>
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search services"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search campus services"
              />
              <kbd>/</kbd>
            </label>
          </div>

          <div className="service-grid">
            {filteredServices.map((service, index) => (
              <article className="service-card" key={service.name}>
                <div className="card-topline">
                  <span className={`service-icon ${service.color}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </div>
                <span className={`category-tag ${service.color}`}>{service.label}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a href="#about" className="text-link">
                  View service <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <p className="empty-state">
              No example services match “{search}”. Try another search.
            </p>
          )}
        </section>

        <section className="updates-section" id="announcements">
          <div className="updates-title">
            <div className="eyebrow">THE LATEST</div>
            <h2>Campus updates</h2>
            <p>Example announcements for the design preview.</p>
          </div>

          <div className="updates-list">
            {announcements.map((announcement) => (
              <article className="update-row" key={announcement.title}>
                <div className="update-symbol" aria-hidden="true">↗</div>
                <div className="update-content">
                  <span>{announcement.tag}</span>
                  <h3>{announcement.title}</h3>
                  <small>{announcement.date}</small>
                </div>
                <span className="update-arrow" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </section>

        <section className="disclaimer" id="about">
          <span aria-hidden="true">i</span>
          <p>
            <strong>Project concept preview.</strong> This student project is not
            an official MPC service. The content shown is fictional demo material;
            verify service details with the relevant office.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">MPC <strong>SAFARI</strong></a>
        <span>Student project concept · Built by the team</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;





{/*import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/}
