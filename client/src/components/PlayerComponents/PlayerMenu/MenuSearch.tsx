import React, { useState } from "react";
import { useSpotifyWebApi } from "../../../context/spotifyWebApiContext";
import useForm from "../../../utils/hooks/useForm";
import Button from "../../Button/Button";
import { SearchIcon } from "../../Icons/Icons";
import Input from "../../Input/Input";
import DetailedView from "./PlayerMenuSearch/DetailedView";
import SearchScrollResults from "./PlayerMenuSearch/SearchScrollResults";
import TracksResults from "./Tracks/TracksResults";

const MenuSearch = () => {
  const [results, setResults] = useState<Player.SearchResults | undefined>(
    undefined
  );
  const [detailedInfo, setDetailedInfo] =
    useState<Player.DetailedView>(undefined);
  const [values, changeHandle] = useForm({ search: "" });

  const { search, fetchAlbum, fetchPlaylist } = useSpotifyWebApi();

  // Fetches data based on search value and set it to the local state.
  const formHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.search) return;
    const results = await search(values.search);
    results &&
      setResults({
        albums:
          results.albums as SpotifyApi.PagingObject<Spotify.FullAlbumResults>,
        playlist: results.playlists,
        tracks: results.tracks,
      });
  };

  // Sets The current Detailed View Info
  const setDetailedView: Player.SetDetailedView = async (type, id) => {
    if (type === "album") {
      const items = results?.albums?.items.filter((item) => item.id === id);
      const album = items && (await fetchAlbum(items[0].id));
      album && setDetailedInfo({ type, payload: album });
    } else {
      const items = results?.playlist?.items.filter((item) => item.id === id);
      const playlist = items && (await fetchPlaylist(items[0].id));
      playlist && setDetailedInfo({ type, payload: playlist });
    }
  };

  return (
    <>
      {!detailedInfo ? (
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
          {results && (
            <div className="w-full flex flex-col overflow-y-hidden">
              <div className="overflow-y-scroll disable-scrollbars">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-4 w-full">
                  <SearchScrollResults
                    results={{ type: "album", payload: results.albums }}
                    setDetailedView={setDetailedView}
                  />
                  <SearchScrollResults
                    results={{ type: "playlist", payload: results.playlist }}
                    setDetailedView={setDetailedView}
                  />
                </div>
                <TracksResults
                  results={results.tracks?.items}
                  withTitle
                  withArtist
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-[90%] -mt-4 lg:text-left py-4 overflow-y-scroll disable-scrollbars lg:overflow-y-hidden">
          <DetailedView
            data={detailedInfo.payload}
            setDetailedInfo={setDetailedInfo}
          />
        </div>
      )}
    </>
  );
};

export default MenuSearch;
