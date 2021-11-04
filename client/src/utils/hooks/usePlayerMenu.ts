import { selectSpotify } from "../../redux/store";
import { setDetailedView } from "../../redux/spotify";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";

/**
 * This hook is used to set the player's menu states
 * @function setDetailedInfo - sets the current `Detailed View` state with the correct info.
 * @returns the functions.
 */
const usePlayerMenu = () => {
  const { fetchAlbum, fetchPlaylist } = useSpotifyWebApi();
  const {
    search: { results },
  } = useSelector(selectSpotify);
  const dispatch = useDispatch();

  // Sets The current Detailed View Info
  const setDetailedInfo: Player.SetDetailedView = async (type, id) => {
    if (type === "album") {
      const items = results?.albums?.items.filter((item) => item.id === id);
      const album = items && (await fetchAlbum(items[0].id));
      album && dispatch(setDetailedView({ type, payload: album }));
    } else {
      const items = results?.playlist?.items.filter((item) => item.id === id);
      const playlist = items && (await fetchPlaylist(items[0].id));
      playlist && dispatch(setDetailedView({ type, payload: playlist }));
    }
  };

  return {
    setDetailedInfo,
  };
};

export default usePlayerMenu;
