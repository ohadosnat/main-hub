import store from "../redux/store";
import { setMessage } from "../redux/global";
import { setLocationName } from "../redux/user";

/**
 * Handles the user's location value (locally and on Firestore).
 * @param location - the input value.
 */
const locationChangeHandle = async (location: string): Promise<void> => {
  const { locationByName } = store.getState().user.weather;
  if (!location) {
    store.dispatch(setMessage("Please enter a location 🌎"));
    setTimeout(() => store.dispatch(setMessage("")), 2000);
    return;
  } else if (location.toLowerCase() === locationByName.toLowerCase()) {
    store.dispatch(setMessage("Please enter a different location 🌎"));
    setTimeout(() => store.dispatch(setMessage("")), 2000);
    return;
  } else {
    store.dispatch(setLocationName(location));
    store.dispatch(setMessage(""));
  }
};

export default locationChangeHandle;
