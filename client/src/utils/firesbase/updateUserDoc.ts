import { doc, updateDoc } from "@firebase/firestore";
import { database } from "./firebaseConfig";

/**
 * Updates a document inside the `users` collection in `Firestore` database with the provided data.
 * @param reference - the document ID that will be updated (usually the user's `uid`)
 * @param data - the data that will be updated.
 * @example updateUserDoc(uid, {theme: "dark"})
 */
export const updateUserDoc = (reference: string, data: any): void => {
  const dofRef = doc(database, "users", reference);
  updateDoc(dofRef, data).catch((err) => console.log(err));
};
