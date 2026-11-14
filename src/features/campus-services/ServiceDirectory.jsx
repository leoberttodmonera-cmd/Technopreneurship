import { useMemo, useState } from 'react';

function ServiceDirectory({ state }) {
  const [query, setQuery] = useState('');
  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return state.items;
    return state.items.filter((item) => `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(normalized));
  }, [query, state.items]);

  return (
    <section className="content-section" id="services" aria-labelledby="services-heading">
      <div className="section-heading">
        <div><p className="eyebrow">EXPLORE THE HUB</p><h2 id="services-heading">Campus services</h2><p className="section-subtitle">Example categories for the first development preview.</p></div>
        <label className="search-control"><span aria-hidden="true">⌕</span><span className="sr-only">Search services</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services" /></label>
      </div>
      {state.status === 'loading' && <p className="state-message" role="status">Loading example services…</p>}
      {state.status === 'error' && <p className="state-message state-error" role="alert">Could not load services: {state.error}</p>}
      {state.status === 'ready' && visibleItems.length > 0 && (
        <div className="service-grid">{visibleItems.map((item) => <article className="service-card" key={item.id}>
          <div className="service-card-top"><span className={`service-glyph tone-${item.tone}`}>{item.shortCode}</span><span className="demo-pill">DEMO</span></div>
          <p className="service-category">{item.category}</p><h3>{item.name}</h3><p className="service-description">{item.description}</p>
          <div className="service-meta"><span>{item.location}</span><span aria-hidden="true">↗</span></div>
        </article>)}</div>
      )}
      {state.status === 'ready' && visibleItems.length === 0 && <p className="state-message">No demo services match “{query}”. Try another search.</p>}
    </section>
  );
}

export default ServiceDirectory;
