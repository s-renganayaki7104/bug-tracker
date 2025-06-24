import React from 'react';

interface BugFormProps {
  formData: any;
  setFormData: any;
  handleSubmit: (e: React.FormEvent) => void;
  
}

const BugForm: React.FC<BugFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  
}) => {
  return (
    <section className="bug-form-section">
     
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
             <h2>Breach Detected – Report It</h2>
          <label htmlFor="title">Bug Type</label>
          <select id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required>
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
          <label htmlFor="reporter">Reporter</label>
          <input
            id="reporter"
            type="text"
            placeholder="Who found this bug?"
            value={formData.reporter}
            onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            id="assignedTo"
            type="text"
            placeholder="Who should fix this?"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            required
          />
        </div>

       

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit Bug</button>
      </form>
    </section>
  );
};

export default BugForm;
