import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/store";
import { setUser } from "../../redux/user";
import { auth, database } from "../firesbase/firebaseConfig";

const initialUserDoc: IUserSliceState = {
  uid: "",
  name: "",
  theme: "light",
  weather: {
    locationByName: "",
    locatoinByCords: [],
  },
  spotify: {
    isLogged: false,
    refresh_token: "",
  },
};

/**
 * Handles the `Firebase` authentication.
 * @function `signup` - Creates a new user in `Firestore` auth database, creates a new document for the user.
 * @function `logout` - Perform a `logout` request to `Firestore`, setting `auth.currentUser` to `null`
 * @function `login` - Logs the user in with the provided credential.
 * @function `authCheck` - Fires when `onAuthStateChanged` tiggers. This will check if there's a current user and based on that perform actions.
 * @returns each function, a `loading` state (`boolean`), and a `message` (`string`) that can be used for displaying error messages.
 */
const useAuth = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true); // TODO: implement loading state.
  const dispatch = useDispatch();

  /**
   * Creates a new user in `Firestore` auth database, creates a new document for the user.
   * @param email - the user's email address
   * @param password - the user's password
   * @param name - the user first name
   * @fires - this function fires the `Firebase` `onAuthStateChanged` which sets the `user` local state with the fetched's data.
   * @returns
   * - Creates a new `document` (under the user's `uid`) inside `Firestore` with the initial state.
   */
  const signup = async (
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
      setMessage("Failed to signup 😢");
      console.error(error);
    }
  };

  /**
   * Perform a `logout` request to `Firestore`, setting `auth.currentUser` to `null`
   * @fires - this function fires the `Firebase` `onAuthStateChanged` which will clear the `user` local state (back to initial state).
   */
  const logout = async (): Promise<void> => {
    try {
      signOut(auth);
    } catch (error) {
      setMessage("Failed to signup 😢");
      console.error(error);
    }
  };

  /**
   * Logs the user in with the provided credential.
   * @param email - the user's email address.
   * @param password - the user's password.
   * @fires - this function fires the `Firebase` `onAuthStateChanged` which will set the `user` local state with the fetched's data.
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setMessage("Failed to login 😢");
      console.error(error);
    }
  };

  /**
   * Fires when `onAuthStateChanged` tiggers. This will check if there's a current user and based on that perform actions.
   * - If `authUser` is `truthy`, `Firestore` will fetch the user's document using the user's `uid`, and then sets the `user` local state to the fetched data.
   * - If `authUser` is `falsy`, an aciton will be dispatched to clear the current `user` local state.
   * @param authUser - an object of type `User` that is taken from `auth.currentUser`.
   */
  const authStateCheck = async (authUser: User | null): Promise<void> => {
    if (authUser) {
      const docRef = doc(database, "users", authUser.uid);
      try {
        setLoading(true);
        const userDoc = await getDoc(docRef);
        const data = userDoc.data();
        data && dispatch(setUser(data as IUserSliceState));
        setLoading(false);
      } catch (error) {
        setMessage("Failed to fetch document 😢");
        console.error(error);
      }
    } else {
      dispatch(setUser(null));
    }
  };

  /* --UseState-- */

  useEffect(() => {
    // listens for any auth state changes (login, logout, signup)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authStateCheck(user);
    });
    return unsubscribe;
  }, []);

  return { login, logout, signup, message, loading };
};

export default useAuth;
