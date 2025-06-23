// src/BugTrackerHome.tsx
import React, { useEffect, useState } from 'react';
import './BugTracker.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  fetchBugs as fetchAllBugs,
  addBug,
  updateBug,
  deleteBug,
} from './services/bugService';

interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

const BugTrackerHome: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Low',
  });

  const fetchBugs = async () => {
    try {
      const res = await fetchAllBugs();
      setBugs(res.data);
    } catch (error) {
      toast.error('Error fetching bugs.');
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBug(formData);
      toast.success('Bug submitted successfully!');
      fetchBugs();
      setFormData({ title: '', description: '', status: 'Open', priority: 'Low' });
      setScreenshotName('');
    } catch (error) {
      toast.error('Error submitting bug.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBug(id);
      toast.info('Bug deleted');
      fetchBugs();
    } catch (error) {
      toast.error('Error deleting bug.');
    }
  };

  const markResolved = async (bug: Bug) => {
    try {
      await updateBug(bug.id, { ...bug, status: 'Resolved' });
      toast.success('Bug marked as resolved');
      fetchBugs();
    } catch (error) {
      toast.error('Error updating bug.');
    }
  };

  const getSeverityEmoji = (priority: string) => {
    switch (priority) {
      case 'High': return '🔥 Blocker';
      case 'Medium': return '😠 Critical';
      case 'Low': return '😐 Minor';
      default: return '';
    }
  };

  return (
    <div className="bug-tracker-container">
      <ToastContainer />
      <h1 className="bug-tracker-title">🐞 Bug Tracker</h1>

      {/* Bug Info */}
      <section className="bug-info">
        <h2>Types of Bugs</h2>
        <ul>
          <li><strong>UI Bugs:</strong> Layout, color, or font issues</li>
          <li><strong>Functional Bugs:</strong> Broken features or incorrect results</li>
          <li><strong>Performance Bugs:</strong> Slow loading or freezing</li>
          <li><strong>Security Bugs:</strong> Unauthorized access or data leaks</li>
          <li><strong>Compatibility Bugs:</strong> Issues on specific devices or browsers</li>
        </ul>
      </section>

      {/* Bug Entry Form */}
      <section className="bug-form-section">
        <h2>Submit a New Bug</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="title">Bug Type</label>
            <select
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            >
              <option value="">-- Select Bug Type --</option>
              <option value="UI Issue">UI Issue</option>
              <option value="Functional Bug">Functional Bug</option>
              <option value="Performance Lag">Performance Lag</option>
              <option value="Security Vulnerability">Security Vulnerability</option>
              <option value="Compatibility Problem">Compatibility Problem</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Describe the issue"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="screenshot">Attach Screenshot</label>
            <input type="file" accept="image/*" onChange={handleScreenshotChange} />
            {screenshotName && <p className="file-name">🖼 Selected: {screenshotName}</p>}
          </div>

          <button type="submit" className="submit-btn">Submit Bug</button>
        </form>

        <h3>Bug List</h3>
        {bugs.length === 0 ? (
          <p>No bugs submitted yet.</p>
        ) : (
          <table className="bug-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id}>
                  <td>{bug.title}</td>
                  <td>{bug.status}</td>
                  <td>{bug.priority}</td>
                  <td>{getSeverityEmoji(bug.priority)}</td>
                  <td>
                    <button onClick={() => markResolved(bug)}>Resolve</button>
                    <button onClick={() => handleDelete(bug.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default BugTrackerHome;
