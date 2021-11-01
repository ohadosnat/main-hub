import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSpotify } from "../../../../redux/store";
import SearchScrollResult from "./SearchScrollResult";

interface Props {
  type: Player.DetailedViewStates;
}

type DataState =
  | Spotify.FullAlbumResults[]
  | SpotifyApi.PlaylistObjectSimplified[]
  | undefined;

const SearchScrollResults = ({ type }: Props) => {
  const [data, setData] = useState<DataState>(undefined);

  const {
    search: { results },
  } = useSelector(selectSpotify);

  useEffect(() => {
    if (!results) return;
    if (type === "album") {
      const albums = results.albums?.items.filter(
        ({ album_type }) => album_type === "album"
      );
      setData(albums);
    } else {
      setData(results.playlist?.items);
    }
  }, [results]);

  return (
    <div className="text-left w-full md:w-2/5 flex-grow">
      <h3 className="text-2xl font-medium -mb-2 capitalize">{type}</h3>
      <div className="overflow-x-scroll disable-scrollbars">
        <div className="flex w-max space-x-6 py-4 px-2">
          {data?.map((item) => (
            <SearchScrollResult key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScrollResults;
