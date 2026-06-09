// ============================================================
// VRUTA DEMO — Firebase Config
// Proyecto: vruta-demo
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCzX3QK3cm9UZ46GMZ7lbNZ58ShRDr3qFc",
  authDomain:        "vruta-demo.firebaseapp.com",
  projectId:         "vruta-demo",
  storageBucket:     "vruta-demo.firebasestorage.app",
  messagingSenderId: "752394046683",
  appId:             "1:752394046683:web:a80cde825fb6d4c99590fe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
