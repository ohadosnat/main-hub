import { useEffect, useState } from "react";
import { useSpotifyWebApi } from "../../../context/spotifyWebApiContext";
import TracksResults from "./Tracks/TracksResults";

interface Props {
  activeTab?: string;
}

const MenuHistory = ({ activeTab }: Props) => {
  // Local State
  const [tracks, setTracks] = useState<SpotifyApi.PlayHistoryObject[]>([]);

  // Custom Hook
  const { getRecentlyPlayed } = useSpotifyWebApi();

  // Effect - fetch only when the menu is open.
  useEffect(() => {
    if (activeTab !== "history") return;
    setTracks([]); // resets the tracks before each fetch
    getRecentlyPlayed().then((data) => data && setTracks(data));
  }, [activeTab]);

  return (
    <div className="w-full overflow-y-scroll disable-scrollbars">
      <div className="-mb-4 text-sm font-medium italic" aria-hidden>
        Recently Played Songs might not be accurate.
      </div>
      <TracksResults withArtist results={tracks} />
    </div>
  );
};

export default MenuHistory;
