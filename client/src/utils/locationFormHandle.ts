import { setMessage } from "../redux/global";
import store from "../redux/store";
import { setLocationName } from "../redux/user";

/**
 * Handles the user's location value (locally and on Firestore).
 * @param location - the input value.
 * @param setShowInput - `optional`, if needed, can set the input visibility to the user.
 */
const locationChangeHandle = (
  location: string,
  setShowInput?: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (!location) {
    store.dispatch(setMessage("Please enter a location 🌎"));
    setTimeout(() => store.dispatch(setMessage("")), 2000);
    return;
  }
  store.dispatch(setLocationName(location));
  store.dispatch(setMessage(""));
};

export default locationChangeHandle;
