import axios from 'axios';
import { Bug, NewBugInput } from '../types/bugTypes';



const API_BASE = "http://localhost:8080";

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
