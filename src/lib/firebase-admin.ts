import { type ServiceAccount } from "firebase-admin/app";

let adminDb: FirebaseFirestore.Firestore | null = null;
let adminAuth: import("firebase-admin/auth").Auth | null = null;

export async function getFirebaseAdmin() {
  if (adminDb && adminAuth) {
    return { adminDb, adminAuth };
  }

  const { initializeApp, getApps, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const { getAuth } = await import("firebase-admin/auth");

  if (getApps().length > 0) {
    adminDb = getFirestore();
    adminAuth = getAuth();
    return { adminDb, adminAuth };
  }

  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  const app = initializeApp({
    credential: cert(serviceAccount),
  });

  adminDb = getFirestore(app);
  adminAuth = getAuth(app);

  return { adminDb, adminAuth };
}
