import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../../context/spotifyWebApiContext";
import { setSearchResults } from "../../../redux/spotify";
import { selectSpotify } from "../../../redux/store";
import useForm from "../../../utils/hooks/useForm";
import Button from "../../Button/Button";
import { SearchIcon } from "../../Icons/Icons";
import Input from "../../Input/Input";
import DetailedView from "./PlayerMenuSearch/DetailedView";
import SearchScrollResults from "./PlayerMenuSearch/SearchScrollResults";
import TracksResults from "./Tracks/TracksResults";

const MenuSearch = () => {
  // Local & Global States
  const [values, changeHandle] = useForm({ search: "" });
  const { search } = useSelector(selectSpotify);

  // Handlers
  const dispatch = useDispatch();
  const { getSearchResults } = useSpotifyWebApi();

  // Fetches data based on search value and set it to the local state.
  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.search) return;
    const results = await getSearchResults(values.search);
    results &&
      dispatch(
        setSearchResults({
          albums:
            results.albums as SpotifyApi.PagingObject<Spotify.FullAlbumResults>,
          playlist: results.playlists,
          tracks: results.tracks,
        })
      );
  };

  return (
    <>
      {!search.detailedView ? (
        <>
          <form
            onSubmit={(e) => formHandle(e)}
            className="flex flex-col md:flex-row w-full"
          >
            <Input
              name="search"
              type="text"
              aria-label="search bar"
              placeholder="Search Tracks, Albums, Playlists..."
              onChange={changeHandle}
              value={values.search}
              className="flex-grow h-12"
            />
            <Button
              title="search"
              className="w-full my-2 md:mt-0 md:ml-4 md:w-[20%] bg-black text-white h-12"
              startIcon={<SearchIcon className="w-5 stroke-current" />}
            />
          </form>
          {search.results && (
            <div className="w-full flex flex-col overflow-y-hidden">
              <div className="overflow-y-scroll disable-scrollbars">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-4 w-full">
                  <SearchScrollResults type="album" />
                  <SearchScrollResults type="playlist" />
                </div>
                <TracksResults
                  results={search.results.tracks?.items}
                  withTitle
                  withArtist
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-[90%] -mt-4 lg:text-left py-4 overflow-y-scroll disable-scrollbars lg:overflow-y-hidden">
          <DetailedView data={search.detailedView.payload} />
        </div>
      )}
    </>
  );
};

export default MenuSearch;
