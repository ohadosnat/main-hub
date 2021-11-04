import React from "react";
// Redux & Context
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/global";
import { setDetailedView } from "../../../redux/spotify";
import { selectGlobal, selectSpotify } from "../../../redux/store";
import { useSpotifyWebApi } from "../../../context/spotifyWebApiContext";
// Hooks & Utils
import useForm from "../../../utils/hooks/useForm";
import { extractURI } from "../../../utils/player";
// Components
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { SearchIcon } from "../../Icons/Icons";
import DetailedView from "./PlayerMenuSearch/DetailedView";

const MenuLoad = () => {
  const [values, changeHandle] = useForm({ url: "" });

  const { search } = useSelector(selectSpotify);
  const { message } = useSelector(selectGlobal);
  const dispatch = useDispatch();
  const { fetchPlaylist, fetchAlbum } = useSpotifyWebApi();

  // Formats the URL, fetches data and sets it.
  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents a page refresh
    const { url } = values;

    // Stops the form submit if the field is empty/contains a track url or if it doesn't start with the spotify url.
    const regex: RegExp = /(https:\/\/open.spotify.com\/)(album|playlist)\//g;
    if (!url || !url.match(regex)) {
      dispatch(setMessage("please enter a valid link 😬"));
      setTimeout(() => dispatch(setMessage("")), 3000);
      return;
    }

    // formats the url to uri
    const uri = extractURI(url);
    // if the uri length is less than 22, it means it's not valid
    if (uri.length < 22) {
      dispatch(setMessage("ID is too short, please enter a valid link 😬"));
      setTimeout(() => dispatch(setMessage("")), 3000);
      return;
    } else {
      if (url.includes("album")) {
        const album = await fetchAlbum(uri);
        album && dispatch(setDetailedView({ type: "album", payload: album }));
      } else {
        const playlist = await fetchPlaylist(uri);
        playlist &&
          dispatch(setDetailedView({ type: "playlist", payload: playlist }));
      }
      // Resets the text field.
      values.url = "";
    }
  };

  return (
    <>
      {!search.detailedView ? (
        <div className=" w-full sm:w-4/5 mx-auto h-full flex flex-col items-center justify-center">
          <h4 className="mb-6 font-medium text-xl md:text-2xl">
            Please Enter a Playlist/Album Spotify URL
          </h4>
          <form
            onSubmit={(e) => formHandle(e)}
            className="flex flex-col md:flex-row w-full xl:w-4/5"
          >
            <Input
              name="url"
              type="text"
              aria-label="url text field"
              placeholder="Spotify URL (e.g., https://open.spotify.com/album/73A5i6uEMBa2qpGDKdZu3u?si=6a3YhoDySKCcxjJU3zU_Aw)"
              onChange={changeHandle}
              value={values.url}
              className="flex-grow h-12"
            />
            <Button
              title="Load"
              className="w-full my-2 md:mt-0 md:ml-4 md:w-[30%] bg-black text-white h-12"
              startIcon={<SearchIcon className="w-5 stroke-current" />}
            />
          </form>
          {message && <p className="text-red-500 mt-4 capitalize">{message}</p>}
        </div>
      ) : (
        <div className="w-full h-[90%] -mt-4 lg:text-left py-4 overflow-y-scroll disable-scrollbars lg:overflow-y-hidden">
          <DetailedView />
        </div>
      )}
    </>
  );
};

export default MenuLoad;
