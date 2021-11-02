/**
 * Auth utils functions that handles the `user` store, and Firestore's auth state.
 * These functions will @fires
 * @function `signup` - Creates a new user in `Firestore` auth database, creates a new document for the user.
 * @function `logout` - Perform a `logout` request to `Firestore`, setting `auth.currentUser` to `null`
 * @function `login` - Logs the user in with the provided credential.
 * @fires onAuthStateChanged, which is under the @useAuth hook and fetches the user's doc.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, database } from "./firesbase/firebaseConfig";
import store from "../redux/store";
import { setMessage } from "../redux/global";

const initialUserDoc: IUserSliceState = {
  uid: "",
  name: "",
  theme: "light",
  weather: {
    locationByName: "",
    locationByCoords: [],
  },
  spotify: {
    isLogged: false,
    refresh_token: "",
  },
};

/**
 * Perform a `logout` request to `Firestore`, setting `auth.currentUser` to `null`
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which will clear the `user` local state (back to initial state).
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to logout😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(error);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};

/**
 * Logs the user in with the provided credential.
 * @param email - the user's email address.
 * @param password - the user's password.
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which will set the `user` local state with the fetched's data.
 */
export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to login😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(errorMessage);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};

/**
 * Creates a new user in `Firestore` auth database, creates a new document for the user.
 * @param email - the user's email address
 * @param password - the user's password
 * @param name - the user first name
 * @fires - this function fires the `Firebase` `onAuthStateChanged` which sets the `user` local state with the fetched's data.
 * @returns Creates a new `document` (under the user's `uid`) inside `Firestore` with the initial state.
 */
export const signup = async (
  email: string,
  password: string,
  name: string
): Promise<void> => {
  if (auth.currentUser) return; // prevents from creating a new account during an active session
  try {
    const userCreds: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCreds.user;
    const newUserData: IUserSliceState = { ...initialUserDoc, uid, name };
    const docRef = doc(database, "users", uid);
    await setDoc(docRef, newUserData);
  } catch (error) {
    const errorMessage: ErrorMessage = { message: "Failed to signup😢", error };
    store.dispatch(setMessage(errorMessage.message));
    console.error(error);
    setTimeout(() => store.dispatch(setMessage("")), 2000);
  }
};
