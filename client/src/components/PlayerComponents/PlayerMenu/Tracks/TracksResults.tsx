import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSpotify } from "../../../../redux/store";
import { formatResults } from "../../../../utils/player";
import Track from "./Track";

interface Props {
  withTitle?: boolean;
  withArtist?: boolean;
  results: Player.TrackResults;
}

const TracksResults = ({ withTitle, withArtist, results }: Props) => {
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
        {tracks.map((track) => (
          <Track
            key={track.id || nanoid()}
            data={track}
            withArtist={withArtist}
          />
        ))}
      </div>
    </div>
  );
};

export default TracksResults;
