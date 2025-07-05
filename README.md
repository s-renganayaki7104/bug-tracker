# BuggedOut  
*Track. Debug. Done.*

## Overview  
BuggedOut is a full-stack bug tracking platform built for developers and teams who want more than just a static issue list. Designed with clarity, collaboration, and performance in mind, it allows users to log, manage, and resolve bugs with ease across dynamic projects.

Featuring a hybrid frontend using both **React** and **Vue**, a **Spark Java** backend, and **Firebase** as the database and authentication layer, BuggedOut focuses on modular design, fast data retrieval, and a smooth developer experience.

The application supports role-based user access, bug status workflows, and real-time updates. With Firebase handling auth and storage, BuggedOut scales easily for solo developers and teams alike.

---

## Contributors  
[Meet the Contributors](https://github.com/s-renganayaki7104)

---

## Table of Contents  
- [Inspiration](#inspiration)  
- [Goals (Achieved)](#goals-achieved)  
- [Built With](#built-with)  
- [Challenges](#challenges)  
- [Accomplishments](#accomplishments)  
- [What We Learned](#what-we-learned)  
- [What's Next](#whats-next)  
- [CI/CD Pipeline – CircleCI](#cicd-pipeline--circleci)  
- [How to Run](#how-to-run)

---

## Inspiration  
BuggedOut was born out of frustration with bloated, enterprise-level bug trackers that overwhelm users with complexity. Most tools either lack customization, have poor UX, or are over-engineered for solo developers and small teams.

We set out to build something in-between: a minimalist yet powerful tracker that feels natural to use. Inspired by tools like **Trello** (workflow), **Notion** (simplicity), and **GitHub Issues** (developer-focus), we created something fast, flexible, and built for real-world use.

We also used this project to explore combining multiple frontend frameworks (React + Vue), Firebase’s real-time capabilities, and building a lightweight backend in Spark Java—just for the love of clean, experimental architecture.

---

## Goals (Achieved)  
-  A clean and responsive UI that adapts to user preferences and devices  
-  Modular frontend split into React (dashboard) and Vue (bug detail views)  
-  Backend developed using Spark Java for simplicity and performance  
-  Firebase integration for real-time sync, authentication, and hosting  
-  Role-based access, status transitions, and priority filtering

---

## Built With  

### Frontend  
- **React** – Dashboard, login, and admin interfaces  
- **Vue** – Bug detail viewer and live update components  
> This dual-framework architecture helped explore micro-frontend separation and modular UI development.

### Backend  
- **Spark Java** – Lightweight, functional web framework used to serve REST APIs and handle core logic.

### Database & Auth  
- **Firebase (Firestore + Auth)** – Handles user authentication, real-time database sync, and static hosting.

---

## Challenges  
- Managing two frontend frameworks while keeping them functionally isolated  
- Writing secure Firebase rules for real-time access without compromising flexibility  
- Integrating Spark Java and Firebase cleanly with proper error handling  
- Handling state synchronization between live Firebase data and local state  
- Making the UI consistently responsive across screen sizes and devices

---

## Accomplishments  
-  Successfully integrated React and Vue in a shared frontend  
-  Real-time bug updates using Firestore listeners  
-  Built a bug lifecycle system with full status management  
-  Implemented secure auth with Firebase + role-based logic  
-  Delivered a full-stack MVP with real-world usability

---

## What We Learned  
- **Micro-frontend patterns**: Combining React and Vue taught us about framework isolation, routing, and shared state strategies in a multi-framework architecture.  
- **Firebase rule design**: Getting security and performance right with Firestore’s rules and indexes was a key learning experience.  
- **Spark Java design thinking**: Its minimalist structure pushed us toward clean, functional API design and strict separation of concerns.  
- **Auth implementation**: We gained a deeper understanding of role-based guards, protected routes, and securing backend endpoints with Firebase tokens.  
- **State & Sync**: Balancing Firebase listeners with local UI state helped us handle edge cases like live updates, race conditions, and avoiding render flickers.

---

## What's Next  
-  Push/email notifications for bug assignments and status updates  
-  Export bug logs (CSV, JSON)  
-  GitHub/GitLab integration (auto-log from commits)  
-  Analytics dashboard: bug trends, resolution times, assignee load  
-  Mobile-friendly design or native app via React Native / Flutter

---
