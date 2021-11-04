import { useSelector } from "react-redux";
import { selectSpotify } from "../../../../redux/store";
import { useSpotifyWebApi } from "../../../../context/spotifyWebApiContext";
import { PauseIcon, PlayIcon } from "../../../Icons/Icons";

interface Props {
  data: Spotify.Track;
  withArtist?: boolean;
  isDetailed?: boolean;
}

const Track = ({ data, withArtist, isDetailed }: Props) => {
  const { isPlaying, name, uri, artist, duration, is_local } = data;

  const { player, search } = useSelector(selectSpotify);
  const { togglePlayerState } = useSpotifyWebApi();

  // Handles the user's action
  const playerStateHandle: Player.PlayerStateHandle = (
    type,
    contextURI,
    trackURI
  ) => {
    if (type === "pause") togglePlayerState(type);
    else {
      !isDetailed
        ? togglePlayerState(type, false, undefined, trackURI)
        : togglePlayerState(type, true, contextURI, trackURI);
    }
  };

  return (
    <div
      className={`flex items-center py-2 border-b 2xl:py-3
       ${isPlaying ? "text-indicator" : ""} ${is_local ? "opacity-50" : ""}`}
    >
      <button
        disabled={is_local}
        onClick={() =>
          playerStateHandle(
            isPlaying && player?.is_playing ? "pause" : "play",
            isDetailed ? search.detailedView?.payload.uri : undefined,
            uri
          )
        }
        className={`w-5 h-5 hover:scale-110 transform global-transition ${
          is_local ? "pointer-events-none" : ""
        }`}
      >
        {isPlaying && player?.is_playing ? (
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
          {withArtist && <p className="xl:ml-4">{artist}</p>}
          <p className={`${!withArtist ? "xl:text-right xl:w-full" : ""}`}>
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
