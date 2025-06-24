import React from 'react';

const BugInfo: React.FC = () => (
  <section className="bug-info-blocks">
    <h2 className="bug-info-title">Behind the Bugs</h2>
    <div className="bug-card-container">
      <div className="bug-card">
        <h3>UI Bug</h3>
        <p>Visual issues with layout, fonts, or spacing.</p>
      </div>
      <div className="bug-card">
        <h3>Functional Bug</h3>
        <p>Feature misbehavior or broken functionality.</p>
      </div>
      <div className="bug-card">
        <h3>Performance Bug</h3>
        <p>Slow loading, lag, or unresponsive features.</p>
      </div>
      <div className="bug-card">
        <h3>Security Bug</h3>
        <p>Data leaks or unauthorized access vulnerabilities.</p>
      </div>
      
    </div>
  </section>
);

export default BugInfo;
