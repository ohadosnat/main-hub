import { useEffect, useState } from "react";
import SearchScrollResult from "./SearchScrollResult";

interface Props {
  results: Spotify.SearchPlaylists | Spotify.SearchAlbums;
  setDetailedView: Player.SetDetailedView;
}

type DataState =
  | Spotify.FullAlbumResults[]
  | SpotifyApi.PlaylistObjectSimplified[]
  | undefined;

const SearchScrollResults = ({ results, setDetailedView }: Props) => {
  const [data, setData] = useState<DataState>(undefined);

  useEffect(() => {
    if (results.type === "album") {
      const albums = results.payload?.items.filter(
        ({ album_type }) => album_type === "album"
      );
      setData(albums);
    } else {
      setData(results.payload?.items);
    }
  }, [results]);

  return (
    <div className="text-left w-full md:w-2/5 flex-grow">
      <h3 className="text-2xl font-medium -mb-2 capitalize">{results.type}</h3>
      <div className="overflow-x-scroll disable-scrollbars">
        <div className="flex w-max space-x-6 py-4 px-2">
          {data?.map((item) => (
            <SearchScrollResult
              key={item.id}
              data={item}
              setDetailedView={setDetailedView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScrollResults;
