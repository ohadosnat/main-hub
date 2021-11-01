import { useEffect, useState } from "react";
import usePlayerMenu from "../../../../utils/hooks/usePlayerMenu";

interface Props {
  data: Spotify.FullAlbumResults | SpotifyApi.PlaylistObjectSimplified;
}

const SearchScrollResult = ({ data }: Props) => {
  // States & Props
  const { id, type, images, name } = data;
  const [artwork, setArtwork] = useState<string>("");

  // Custom Hook
  const { setDetailedInfo } = usePlayerMenu();

  useEffect(() => {
    if (images.length === 0) return setArtwork("/assets/noImage.jpg");
    const index = data.type === "album" ? 1 : 0;
    setArtwork(images[index].url);
  }, [data]);

  return (
    <div>
      <button
        onClick={() => setDetailedInfo(type, id)}
        className="text-left global-transition transform hover:scale-110 cursor-pointer active:scale-95"
      >
        <div
          aria-label={`${name} ${type} artwork`}
          style={{
            backgroundImage: `url("${artwork}")`,
          }}
          className="h-32 w-32 rounded-md shadow-md bg-center bg-cover border"
        ></div>
        <h4>{name.length < 15 ? name : `${name.slice(0, 14)}...`}</h4>
      </button>
    </div>
  );
};

export default SearchScrollResult;
