import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
require("dotenv").config();

// Initialize Firebase
var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };
  //firebase.initializeApp(config);
  // Initialize Firebase
const app = initializeApp(config);
//const analytics = getAnalytics(app);