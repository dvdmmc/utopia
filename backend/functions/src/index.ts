import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// GET /events: Fetch a list of events && // POST /events: Create a new offer
export const eventsHandler = functions.https.onRequest(async (req, res) => {
  if (req.method == "GET") {
    try {
      const snapshot = await db.collection("events").get();
      const offers = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      res.status(200).json(offers);
    } catch (error) {
      res.status(500).json({error: "Failed to fetch events"});
    }
  } else if (req.method == "POST") {
    try {
      const newEvent = req.body; // Expecting event details in the request body
      const docRef = await db.collection("events").add(newEvent);
      res.status(201).json({id: docRef.id, ...newEvent});
    } catch (error) {
      res.status(500).json({error: "Failed to create event"});
    }
  } else {
    res.status(405).send("Method Not Allowed");
    return;
  }
});

// GET /events/:id: Fetch details of a specific offer
export const getEventById = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const {id} = req.params;

  try {
    const doc = await db.collection("events").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({error: "Event not found"});
      return;
    }
    res.status(200).json({id: doc.id, ...doc.data()});
  } catch (error) {
    res.status(500).json({error: "Failed to fetch event details"});
  }
});

// POST /events/:id/rsvp: RSVP to a specific event
export const rsvpEvent = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  // Extract the ID from the path
  const idMatch = req.path.match(/^\/events\/([^/]+)\/rsvp$/);
  if (!idMatch) {
    res.status(400).json({error: "Invalid URL format"});
    return;
  }

  const id = idMatch[1]; // Extracted ID from the URL

  try {
    const rsvpData = req.body; // Expecting RSVP details in the request body
    const offerRef = db.collection("events").doc(id);

    const doc = await offerRef.get();
    if (!doc.exists) {
      res.status(404).json({error: "Event not found"});
      return;
    }

    // Assuming an "rsvps" subcollection for RSVPs
    await offerRef.collection("rsvps").add(rsvpData);

    res.status(201).json({message: "RSVP added successfully", rsvp: rsvpData});
  } catch (error) {
    res.status(500).json({error: "Failed to RSVP to the offer"});
  }
});

