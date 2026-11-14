function AnnouncementList({ state }) {
  return (
    <section className="updates-section" id="announcements" aria-labelledby="announcements-heading">
      <div className="updates-intro"><p className="eyebrow">THE LATEST</p><h2 id="announcements-heading">Campus updates</h2><p className="section-subtitle">Fictional examples for developing the announcement interface.</p></div>
      <div className="updates-list">
        {state.status === 'loading' && <p className="state-message" role="status">Loading demo updates…</p>}
        {state.status === 'error' && <p className="state-message state-error" role="alert">Could not load updates: {state.error}</p>}
        {state.status === 'ready' && state.items.map((item) => <article className="update-row" key={item.id}>
          <span className="update-icon" aria-hidden="true">↗</span><div className="update-body"><p>{item.department_name} · PUBLIC DEMO</p><h3>{item.title}</h3><small>{item.published_label}</small><p>{item.body}</p></div><span className="update-arrow" aria-hidden="true">→</span>
        </article>)}
      </div>
    </section>
  );
}

export default AnnouncementList;
