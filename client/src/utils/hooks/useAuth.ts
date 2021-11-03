import { onAuthStateChanged, Unsubscribe, User } from "@firebase/auth";
import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/global";
import { selectUser } from "../../redux/store";
import { setUser } from "../../redux/user";
import { auth, database } from "../firesbase/firebaseConfig";

/**
 * Handles the `Firebase` authentication.
 * @function `authCheck` - Fires when `onAuthStateChanged` tiggers. This will check if there's a current user and based on that perform actions.
 */
const useAuth = () => {
  const { uid } = useSelector(selectUser);
  const dispatch = useDispatch();

  /**
   * Fires when `onAuthStateChanged` tiggers. This will check if there's a current user and based on that perform actions.
   * - If `authUser` is `truthy`, `Firestore` will fetch the user's document using the user's `uid`, and then sets the `user` local state to the fetched data.
   * - If `authUser` is `falsy`, an aciton will be dispatched to clear the current `user` local state.
   * @param authUser - an object of type `User` that is taken from `auth.currentUser`.
   */
  const authStateCheck = async (authUser: User | null): Promise<void> => {
    dispatch(setLoading(true));
    if (authUser) {
      const docRef = doc(database, "users", authUser.uid);
      try {
        const userDoc = await getDoc(docRef);
        const UserData = userDoc.data();
        UserData && dispatch(setUser(UserData as IUserSliceState));
      } catch (error) {
        const errorInfo: ErrorMessage = {
          message: "Failed to fetch document 😢",
          error,
        };
        console.error(errorInfo);
      }
    } else {
      dispatch(setUser(null)); // resets the user local state.
    }
    dispatch(setLoading(false));
  };

  /* --UseState-- */

  // listens for any auth state changes (login, logout, signup)
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) =>
      authStateCheck(user)
    );
    return () => unsubscribe();
  }, []);

  // listens for any doc state updates
  useEffect(() => {
    if (!uid) return;
    const docRef = doc(database, "users", uid);

    const unsubscribe: Unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        const data = doc.data();
        data && dispatch(setUser(data as IUserSliceState));
      },
      (error) => {
        const errorInfo: ErrorMessage = {
          message: "Failed to fetch document 😢",
          error,
        };
        console.error(errorInfo);
      }
    );
    return () => unsubscribe();
  }, [uid]);
};

export default useAuth;
