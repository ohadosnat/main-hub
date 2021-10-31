import { useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../../../context/spotifyWebApiContext";
import { selectSpotify } from "../../../../redux/store";
import { PauseIcon, PlayIcon } from "../../../Icons/Icons";

interface Props {
  data: Spotify.Track;
  withArtist?: boolean;
}

const Track = ({ data, withArtist }: Props) => {
  const { isPlaying, name, uri, artist, duration } = data;

  const { player } = useSelector(selectSpotify);
  const { togglePlayerState } = useSpotifyWebApi();

  // Handles the user's action
  const playerStateHandle = (type: Player.PlayerStates, trackURI?: string) => {
    if (type === "play") togglePlayerState(type, trackURI);
    else togglePlayerState(type);
  };

  return (
    <div
      className={`flex items-center py-2 border-b 2xl:py-3 ${
        isPlaying ? "text-indicator" : ""
      }`}
    >
      <button
        onClick={() =>
          playerStateHandle(
            isPlaying ? "pause" : "play",
            player?.item.name !== name ? uri : undefined
          )
        }
        className="w-5 h-5 hover:scale-110 transform global-transition"
      >
        {isPlaying ? (
          <PauseIcon className="fill-current" />
        ) : (
          <PlayIcon className="fill-current" />
        )}
      </button>
      <div className="flex flex-col ml-4 w-full xl:flex-row">
        <p className="font-medium md:text-lg 2xl:flex-grow xl:w-full">{name}</p>
        <div
          className={`flex w-full justify-between text-sm md:text-base 2xl:items-center mr-2 ${
            !withArtist ? "xl:w-auto xl:ml-4" : ""
          }`}
        >
          {withArtist && <p>{artist}</p>}
          <p className={`${!withArtist ? "xl:text-right xl:w-full" : ""}`}>
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
