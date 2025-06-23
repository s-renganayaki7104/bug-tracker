// src/services/bugService.ts
import axios from "axios";

const API_BASE = "http://localhost:8080";

export const fetchBugs = () => axios.get(`${API_BASE}/bugs`);

export const addBug = (bug: any) => axios.post(`${API_BASE}/bugs`, bug);

export const updateBug = (id: number, updatedBug: any) =>
  axios.put(`${API_BASE}/bugs/${id}`, updatedBug);

export const deleteBug = (id: number) =>
  axios.delete(`${API_BASE}/bugs/${id}`);
