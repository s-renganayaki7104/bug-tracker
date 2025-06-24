import React, { useEffect, useState } from 'react';
import './BugTracker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BugInfo from './components/BugInfo';
import BugForm from './components/BugForm';
import BugTable from './components/BugTable';
import Pagination from './components/Pagination';

import {
  fetchBugs as fetchAllBugs,
  addBug,
  updateBug,
  deleteBug,
} from './services/bugService';

import { Bug } from '../types/bugTypes';

const BugTrackerHome: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Low',
    reporter: '',
    assignedTo: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const bugsPerPage = 5;

  const indexOfLastBug = currentPage * bugsPerPage;
  const indexOfFirstBug = indexOfLastBug - bugsPerPage;
  const currentBugs = bugs.slice(indexOfFirstBug, indexOfLastBug);

  useEffect(() => {
    fetchBugs();
    const interval = setInterval(fetchBugs, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBugs = async () => {
    try {
      const res = await fetchAllBugs();
      setBugs(res.data);
    } catch (error) {
      toast.error('Error fetching bugs.');
    }
  };

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

      setFormData({
        title: '',
        description: '',
        status: 'Open',
        priority: 'Low',
        reporter: '',
        assignedTo: '',
      });

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
    const resolvedBy = prompt('Enter name of person who resolved this bug:');
    if (!resolvedBy) {
      toast.warning('Resolution cancelled.');
      return;
    }

    const updatedBug = {
      ...bug,
      status: 'Resolved',
      resolvedBy,
      resolvedAt: new Date().toISOString(),
    };

    try {
      await updateBug(bug.id, updatedBug);
      toast.success('Bug marked as resolved.');
      fetchBugs();
    } catch (error) {
      toast.error('Failed to update bug.');
    }
  };

  const handleEdit = (bug: Bug) => {
    setFormData({
      title: bug.title,
      description: bug.description,
      status: bug.status,
      priority: bug.priority,
      reporter: bug.reporter,
      assignedTo: bug.assignedTo,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSeverityEmoji = (priority: string) => {
    switch (priority) {
      case 'High':
        return '🔥 Blocker';
      case 'Medium':
        return '😠 Critical';
      case 'Low':
        return '😐 Minor';
      default:
        return '';
    }
  };

  return (
    <div className="bug-tracker-container">
      <ToastContainer />
      <div className="title-block">
  <h1 className="bug-tracker-title">BUGGED<span className="out-text">OUT</span></h1>
  <p className="bug-tracker-subtitle">Track. Debug. Done.</p>
</div>
<div className="hero-image-section">
  <img
    src="/public/banner2.jpg"
    alt="BuggedOut Banner"
    className="hero-image"
  />
  <div className="image-glow-blur" />
  <p className="hero-caption">From chaos to clarity — your bug tracking starts here.</p>
</div>




      <BugInfo />

      <BugForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleScreenshotChange={handleScreenshotChange}
        screenshotName={screenshotName}
      />

      <BugTable
        currentBugs={currentBugs}
        handleEdit={handleEdit}
        markResolved={markResolved}
        handleDelete={handleDelete}
        getSeverityEmoji={getSeverityEmoji}
      />

      <Pagination
        totalPages={Math.ceil(bugs.length / bugsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BugTrackerHome;
