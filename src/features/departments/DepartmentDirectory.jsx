function DepartmentDirectory({ services }) {
  const departments = services.reduce((groups, service) => {
    const key = service.name;
    if (!groups.has(key)) groups.set(key, { name: key, category: service.category, location: service.location, services: [] });
    groups.get(key).services.push(service);
    return groups;
  }, new Map());

  return (
    <section className="page-section" aria-labelledby="departments-title">
      <div className="page-heading"><p className="eyebrow">PEOPLE & OFFICES</p><h1 id="departments-title">Departments</h1><p>Browse example office contacts and service areas. Verify details with the institution before relying on them.</p></div>
      <div className="department-grid">{[...departments.values()].map((department) => <article className="department-card" key={department.name}>
        <span className="service-glyph tone-blue" aria-hidden="true">{department.name.slice(0, 2).toUpperCase()}</span>
        <p className="service-category">{department.category}</p><h2>{department.name}</h2>
        <p>{department.services.map((item) => item.description).join(' ')}</p>
        <div className="department-location">⌖ {department.location}</div>
      </article>)}</div>
    </section>
  );
}

export default DepartmentDirectory;
