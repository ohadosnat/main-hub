import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSpotify } from "../../../../redux/store";
import { formatResults } from "../../../../utils/player";
import Track from "./Track";

interface Props {
  withTitle?: boolean;
  withArtist?: boolean;
  isDetailed?: boolean;
  results: Player.TrackResults;
}

const TracksResults = ({
  withTitle,
  withArtist,
  isDetailed,
  results,
}: Props) => {
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const { player } = useSelector(selectSpotify);

  useEffect(() => {
    setTracks([]); // resets the state
    setTracks(formatResults(player?.item.name, results)); // sets the tracks
  }, [player?.item.name, results]);

  return (
    <div className="mt-6">
      {withTitle && (
        <h2 className="xl:ml-2 flex-grow text-left text-2xl font-medium">
          Tracks
        </h2>
      )}
      <div className="w-full text-left">
        {tracks.map((track, index) => (
          <Track
            key={track.id || index}
            data={track}
            withArtist={withArtist}
            isDetailed={isDetailed}
          />
        ))}
      </div>
    </div>
  );
};

export default TracksResults;
