# Utopia code test app

This repository showcases a sample code test of a basic loyalty rewards app.
The following items haven't yet been addressed due to time constraints:
* Swiping left/right to like/dislike.  This functionality exists in buttons, swiping on gallery items already moves to a different item in the gallery, so some additional UX/UI thought would be necessary which couldn't be completed in the time provided
* Auth not connected.  Most of my previous apps have used Firebase Auth or Auth0, both would be good fits for this app.  
* Additional cleanup and modularity.  With additional time, it'd be good to make everything a bit more modular, reuse styles/templates better, etc.
* Additional architecture, adding services (e.g. API Service to client), error handling
* Tests - software projects aren't complete without them, due to time constraints they've been omitted here

For examples of the above, I'm happy to share/review previous coding projects I've worked on or am currently working on.

---

## Features
- View a carousel of event offers.
- Like or dislike events with button presses.
- Book experiences and RSVP to events.
- Backend powered by Firebase Functions.

---

## Prerequisites
- Node.js (v16 or higher)
- Yarn or npm
- Firebase CLI (`npm install -g firebase-tools`)
- Expo CLI (`npm install -g expo-cli`)
- Firebase project set up with Firestore and Firebase Hosting.

---

## Getting Started

### 1. Run the App Locally

#### Frontend (React Native):
1. Clone the repository:
   ```bash
   git clone git@github.com:dvdmmc/utopia.git
   cd utopia/rn-client

2. Install dependencies:


`yarn install`
or
`npm install`

3. Start the app
`expo start`

#### Backend (Firebase Functions):

### 2. Deploy the Backend (If you'd like to customize, if not can use Firebase backend that the rn-client currently points to)

Firebase Functions:
Navigate to the functions directory:

`cd backend/functions`
Install dependencies:


`yarn install`
or
`npm install`
Log in to Firebase:


`firebase login`
Initialize Firebase:


`firebase init`
Select Functions and Hosting during initialization.
Use your existing Firebase project or create a new one.
Deploy the backend:

`firebase deploy`


Additional Notes
Backend API Endpoints (see backend/functions/src/index.ts)
GET /events: Fetch a list of events.
POST /events: Add a new event (future admin site).
POST /events/:id/rsvp: RSVP to a specific event.

Firebase Setup
Ensure your Firestore has the following collections:

events: Store event data, including title, description, image, points, etc. (need to pre-populate with data)
events/{id}/rsvps: Subcollection for storing RSVPs. (no need, will be created when app is used)
Environment Configuration
For local testing:

Use the Firebase Emulator Suite:

`firebase emulators:start`