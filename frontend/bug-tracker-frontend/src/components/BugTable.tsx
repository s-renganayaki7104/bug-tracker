import React from 'react';
import { Bug } from '../types/bugTypes';

interface BugTableProps {
  currentBugs: Bug[];
  handleEdit: (bug: Bug) => void;
  markResolved: (bug: Bug) => void;
  handleDelete: (id: number) => void;
  //getSeverityEmoji: (priority: string) => string;
}

const BugTable: React.FC<BugTableProps> = ({
  currentBugs,
  handleEdit,
  markResolved,
  handleDelete,
  //getSeverityEmoji
}) => {
  return (
    <>
    <div className="bug-table-wrapper">
      <h3 className="bug-table-title">StatusScope: Bugs</h3>
      {currentBugs.length === 0 ? (
        <p className="no-bugs-text">No bugs submitted yet.</p>
      ) : (
        <table className="bug-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
            {/*   //<th>Severity</th> */}
              <th>Resolved By</th>
              <th>Resolved At</th>
              <th>Reporter</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBugs.map((bug) => (
              <tr key={bug.id}>
                <td>{bug.title}</td>
                <td>{bug.description}</td>
               <td>
  <span className={`status-${bug.status.replace(/\s/g, '').toLowerCase()}`}>
  {bug.status}
</span>

</td>
<td>
  <span className={`priority-${bug.priority.toLowerCase()}`}>
    {bug.priority}
  </span>
</td>

                {/* <td>{getSeverityEmoji(bug.priority)}</td> */}
                <td>{bug.status === 'Resolved' ? bug.resolvedBy || '-' : '-'}</td>
                <td>{bug.status === 'Resolved' && bug.resolvedAt ? new Date(bug.resolvedAt).toLocaleString() : '-'}</td>
                <td>{bug.reporter}</td>
                  <td>
  <div className="bug-action-buttons" style={{ display: 'flex', gap: '8px' }}>
    <button onClick={() => handleEdit(bug)}>Edit</button>
    <button onClick={() => markResolved(bug)}>Resolve</button>
    <button onClick={() => handleDelete(bug.id)}>Delete</button>
  </div>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </>
  );
};

export default BugTable;
