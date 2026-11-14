import { useEffect, useState } from 'react';
import { getStudentFeed } from '../../data/api.js';
function StudentFeed({ user, onSignIn }) {
  const [items, setItems] = useState([]); const [error, setError] = useState('');
  useEffect(() => { if (user) getStudentFeed().then(setItems).catch((problem) => setError(problem.message)); }, [user]);
  return <section className="page-section" aria-labelledby="feed-title"><div className="page-heading"><p className="eyebrow">OFFICE-PUBLISHED CAMPUS UPDATES</p><h1 id="feed-title">Updates feed</h1><p>Only authorized staff can publish announcements. Students can read posts; they cannot publish official updates.</p></div>
    {!user && <div className="state-message">Sign in to see the student feed. <button type="button" className="text-button" onClick={onSignIn}>Sign in</button></div>}{error && <p className="state-message state-error" role="alert">{error}</p>}
    {user && <div className="feed-layout"><div className="updates-list"><h2>Public + student updates</h2>{items.length === 0 && <p className="state-message">No announcements are available.</p>}{items.map((item) => <article className="feed-card" key={item.id}><div className="feed-card-meta"><span className="update-icon" aria-hidden="true">↗</span><span>{item.department_name} · {item.audience_scope === 'public' ? 'PUBLIC' : 'STUDENT'} · DEMO</span><time>{item.published_label}</time></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div>}
  </section>;
}
export default StudentFeed;
