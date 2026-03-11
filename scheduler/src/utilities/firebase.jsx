import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHoAdwUKaRhhTnEwDQWXJQrGHDzb-GbKU",
  authDomain: "create-react-app-e4ca3.firebaseapp.com",
  databaseURL: "https://create-react-app-e4ca3-default-rtdb.firebaseio.com",
  projectId: "create-react-app-e4ca3",
  storageBucket: "create-react-app-e4ca3.firebasestorage.app",
  messagingSenderId: "1064298154186",
  appId: "1:1064298154186:web:d83a47493c2f455e070c33",
  measurementId: "G-8XV6YDTRKH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const database = getDatabase(app);

export const signInWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());

export const signOutUser = () => signOut(auth);
export { signOutUser as signOut };

export const useUserState = () => useAuthState(auth);

export const setData = (path, value) =>
  set(ref(database, path), value);