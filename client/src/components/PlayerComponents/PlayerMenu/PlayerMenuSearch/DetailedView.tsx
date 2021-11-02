import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../../../context/spotifyWebApiContext";
import {
  setDetailedView,
  addDetailedViewTracks,
} from "../../../../redux/spotify";
import { selectSpotify } from "../../../../redux/store";
import { calcTotalDuration } from "../../../../utils/player";
import Button from "../../../Button/Button";
import { CircleArrowIcon } from "../../../Icons/Icons";
import TracksResults from "../Tracks/TracksResults";

const DetailedView = () => {
  // Local States
  const [owner, setOwner] = useState<string>("");
  const [totalDuration, setTotalDuration] = useState<string>("");
  const [remainingTracks, setRemainingTracks] = useState<number>(0);
  const [data, setData] = useState<Player.DetailedViewData>(undefined);

  // Global States
  const { search } = useSelector(selectSpotify);
  const { fetchFullTracks } = useSpotifyWebApi();
  const dispatch = useDispatch();

  const loadMoreTracks: Player.LoadTracks = async (offset) => {
    const tracks = await fetchFullTracks(data!.type, offset, data!.id);
    tracks && dispatch(addDetailedViewTracks(tracks));
  };

  // Effects
  useEffect(() => {
    if (!data) return setData(search.detailedView?.payload); // Sets the initial data.

    const total = calcTotalDuration(data.type, data.tracks.items);
    setTotalDuration(total);

    // Artist/Owner Name
    data.type === "album"
      ? setOwner(data.artists[0].name)
      : setOwner(data.owner.display_name || "Unknown");
  }, [data]);

  // Remaining Tracks to Load
  useEffect(() => {
    if (!data) return;
    if (data.tracks.total - data.tracks.items.length < 0) setRemainingTracks(0);
    else setRemainingTracks(data.tracks.total - data.tracks.items.length);
  }, [data?.tracks.items]);

  return (
    <>
      {data && (
        <div className="flex flex-col w-full lg:flex-row lg:h-full">
          {/* Artwork */}
          <div className="relative rounded-2xl h-64 w-full border mx-auto mb-4 sm:w-3/5 md:overflow-hidden lg:w-4/5 xl:mx-0 xl:h-full xl:w-3/6">
            <div
              className="absolute top-0 left-0 bg-white h-14 w-14 rounded-br-xl border-b border-r"
              aria-hidden="true"
            />
            <img
              src={data?.images[0]?.url || "/assets/noImage.jpg"}
              alt={`${data.name} by ${owner} artwork`}
              className="rounded-2xl md:rounded-none h-full object-center object-cover xl:w-full"
            />
            <button
              onClick={() => dispatch(setDetailedView(undefined))}
              className="absolute top-3 left-3 w-8 h-8 text-black rounded-full hover:scale-110 transform global-transition active:text-indicator "
            >
              <CircleArrowIcon className="fill-current" />
            </button>
          </div>
          {/* Top Info */}
          <div className="h-full flex flex-col ml-4 overflow-y-scroll disable-scrollbars pb-2 lg:w-full xl:w-3/5 xl:flex-grow">
            <h4 className="uppercase text-sm w-full">{data.type}</h4>
            <h2 className=" font-medium text-2xl lg:mt-1 w-full">
              {data.name}
            </h2>
            {data.type === "playlist" && (
              <p className="mb-2">{data.description}</p>
            )}
            <div className="flex flex-col items-center w-full -mb-6 pb-4 border-b lg:flex-row">
              <h3 className="font-medium">{owner}</h3>

              <div className="hidden lg:block rounded-full w-1 h-1 bg-player-secondary mx-2"></div>
              <p>
                {data.tracks.total} Tracks, {totalDuration} Min
              </p>
            </div>
            {/* Tracks */}
            <TracksResults
              results={data.tracks.items}
              withArtist={data.type === "album" ? false : true}
              withTitle={false}
              isDetailed
            />
            {remainingTracks !== 0 && (
              <Button
                title={`Load more (${remainingTracks})`}
                className="w-3/6 mx-auto mt-4"
                onClick={() => loadMoreTracks(data.tracks.items.length)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedView;
