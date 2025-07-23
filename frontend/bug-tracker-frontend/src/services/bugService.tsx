import axios from 'axios';
import { Bug, NewBugInput } from '../types/bugTypes';


const API_BASE =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://bug-tracker-1-1o60.onrender.com'; // <-- Replace this with your deployed backend


//  Get all bugs
export const fetchBugs = () => axios.get<Bug[]>(`${API_BASE}/bugs`);

//  Add a new bug
export const addBug = (bug: NewBugInput) =>
  axios.post<Bug>(`${API_BASE}/bugs`, bug);



//  Update an existing bug
export const updateBug = (id: number, updatedBug: Partial<Bug>) =>
  axios.put<Bug>(`${API_BASE}/bugs/${id}`, updatedBug);

//  Delete a bug
export const deleteBug = (id: number) =>
  axios.delete<void>(`${API_BASE}/bugs/${id}`);
