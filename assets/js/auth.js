// ============================================================
// VRUTA — Auth Helper
// Manejo de sesión, roles y redirección
// ============================================================

import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Login ────────────────────────────────────────────────────
export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const usuario = await getUsuario(cred.user.uid);
  if (!usuario) throw new Error("Usuario no configurado en el sistema.");
  guardarSesion(usuario);
  return usuario;
}

// ── Logout ───────────────────────────────────────────────────
export async function logout() {
  limpiarSesion();
  await signOut(auth);
  window.location.href = "/index.html";
}

// ── Obtener datos del usuario desde Firestore ────────────────
export async function getUsuario(uid) {
  const snap = await getDoc(doc(db, "usuarios", uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() };
}

// ── Sesión en sessionStorage ─────────────────────────────────
export function guardarSesion(usuario) {
  sessionStorage.setItem("vruta_usuario", JSON.stringify(usuario));
}

export function getSesion() {
  const data = sessionStorage.getItem("vruta_usuario");
  return data ? JSON.parse(data) : null;
}

export function limpiarSesion() {
  sessionStorage.removeItem("vruta_usuario");
}

// ── Guard: protege páginas que requieren auth ────────────────
// rol: "operador" | "repartidor" | "superadmin" | null (cualquiera)
export function requireAuth(rolRequerido = null) {
  const usuario = getSesion();

  if (!usuario) {
    window.location.href = "/index.html";
    return null;
  }

  if (rolRequerido && usuario.rol !== rolRequerido) {
    // Redirige según su rol real
    redirigirPorRol(usuario.rol);
    return null;
  }

  return usuario;
}

// ── Redirección por rol ──────────────────────────────────────
export function redirigirPorRol(rol) {
  const rutas = {
    superadmin: "/dashboard.html",
    operador:   "/dashboard.html",
    repartidor: "/repartidor.html"
  };
  window.location.href = rutas[rol] || "/index.html";
}

// ── Observer de Firebase Auth (para casos edge) ──────────────
export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
