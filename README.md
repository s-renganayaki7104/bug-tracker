# BuggedOut  
*Track. Debug. Done.*

## Overview  
BuggedOut is a full-stack bug tracking platform built for developers and teams who want more than just a static issue list. Designed with clarity, collaboration, and performance in mind, it allows users to log, manage, and resolve bugs with ease across dynamic projects. The application supports role-based user access, bug status workflows, and real-time updates. BuggedOut scales easily for solo developers and teams alike.

##Demo Video
[Click here to watch the demo video]https://drive.google.com/file/d/19XGPnXrbYPlSsqzCJd6bThHrS_gSYBxH/view?usp=sharing)

## Contributors  
[@s-renganayaki7104](https://github.com/s-renganayaki7104)
[@poojagowd123](https://github.com/poojagowd123)

## Table of Contents  
- [Inspiration](#inspiration)  
- [Goals Achieved](#goals-achieved)  
- [Built With](#built-with)  
- [Challenges](#challenges)  
- [Accomplishments](#accomplishments)  
- [What We Learned](#what-we-learned)  
- [What's Next](#whats-next)  
- [How to Run Locally](#how-to-run-locally)

## Inspiration  

BuggedOut was born out of frustration with bloated, enterprise-level bug trackers that overwhelm users with complexity. Most tools either lack customization, have poor UX, or are over-engineered for solo developers and small teams. We set out to build something in-between: a minimalist yet powerful tracker that feels natural to use. Inspired by tools like **Trello** (workflow), **Notion** (simplicity), and **GitHub Issues** (developer-focus), we created something fast, flexible, and built for real-world use. Mainly developed to build a lightweight backend in Spark Java—just for the love of clean, experimental architecture.

## Goals Achieved  

- Built a responsive UI using React and TypeScript  
- Connected frontend and backend using RESTful APIs  
- Integrated Firebase Firestore for real-time NoSQL data storage  
- Automated build/test/deploy pipeline via CircleCI  
- Enabled basic bug reporting, editing, and resolution tracking  
- Implemented pagination, toast alerts, and priority tagging

## Built With  

-  **Frontend**: React, TypeScript, Vite, CSS3, Toastify  
- **Backend**: Java (Spark framework), Gson  
- **Database**: Google Firebase Firestore  
- **CI/CD**: CircleCI  
- **Deployment**: Vercel (frontend), localhost/backend  
- **Tools**: GitHub, VSCode

## Challenges  

- Integrating Spark Java with Firebase’s Admin SDK  
- Managing CORS across frontend/backend services  
- Handling real-time Firestore data sync with correct timestamps  
- Debugging CI/CD pipeline failures in CircleCI  
- Ensuring state consistency in paginated views

## Accomplishments 

-  Successfully integrated React and Vue in a shared frontend   
-  Built a bug lifecycle system with full status management  
-  Developed a responsive UI with live feedback, toast notifications, and visual priority cues. 
-  Delivered a full-stack MVP with real-world usability

## What We Learned  

- Designed a modular micro-frontend architecture for scalable bug tracking features.
- Implemented a production-grade frontend with pagination, CORS handling, and real-time state synchronization.
- Applied Spark Java design principles to create a clean, extensible REST API structure.
- Strengthened debugging and traceability through structured logging and error handling.
- Ensured cross-platform compatibility and UI responsiveness across devices.

## What's Next  

- Support image uploads (screenshots with bug reports)  
- Add search, filtering, and sorting capabilities  
- Dashboard analytics for bug statistics  
- Dark mode toggle


##  How to Run Locally  
Follow these steps to set up and run both the frontend and backend of **BuggedOut**:

###  Prerequisites
- Node.js (v16+)
- Java JDK (17+)
- Firebase project with Firestore enabled
- `serviceAccountKey.json` from Firebase Console
- Internet access to install dependencies


### 📁 Folder Structure
```
buggedout/
├── frontend/       # React + Vite frontend
├── backend/        # Spark Java backend
├── .circleci/      # CI/CD config
├── README.md
```


###  1. Set Up Firebase Admin SDK
1. Go to Firebase Console → Project Settings → Service accounts → Generate new private key.
2. Save the file as `serviceAccountKey.json`.
3. Place it in:  
   `backend/src/main/resources/serviceAccountKey.json`


###  2. Start the Backend (Spark Java API)
```bash
cd backend
javac -cp "lib/*" -d bin src/com/example/bugtracker/BugTracker.java
java -cp "lib/*:bin" com.example.bugtracker.BugTracker
```
Server runs at: [http://localhost:8080](http://localhost:8080)


###  3. Start the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: [http://localhost:5173](http://localhost:5173)


###  4. Using the App
- Submit bugs using the form  
- View, edit, resolve, and delete bugs in real time  
- Paginate through bug entries  
- See visual indicators and toast alerts for status updates  
