/**
 * Converts milliseconds to minutes
 * @param ms the time in milliseconds
 * @returns the time in `MM:SS` format
 */
export const calcMstoMin = (ms: number) => {
  const totalMin = Math.floor((ms / (1000 * 60)) % 60);
  const totalSecs =
    Math.floor((ms / 1000) % 60) < 10
      ? `0${Math.floor((ms / 1000) % 60)}`
      : Math.floor((ms / 1000) % 60);
  return `${totalMin}:${totalSecs}`;
};

/**
 * Calculates the current song progress
 * @param current - current position
 * @param duration - the overall track duration
 * @returns the current progress position.
 */
export const calcProgress = (current: number, duration: number) => {
  return (current / duration) * 100;
};

/**
 * Calculates the total duration of an album or playlist
 * @param type - the type of item, can be either `playlist` or `album`
 * @param tracks - the item's tracks.
 * @returns a `string` type value with the total duration in format `MM:SS`
 */
export const calcTotalDuration = (
  type: Player.DetailedViewStates,
  tracks: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.PlaylistTrackObject[]
): string => {
  const total: number =
    type === "album"
      ? (tracks as SpotifyApi.TrackObjectSimplified[]).reduce(
          (a, b) => a + b.duration_ms,
          0
        )
      : (tracks as SpotifyApi.PlaylistTrackObject[]).reduce(
          (a, b) => a + b.track?.duration_ms || 0,
          0
        );
  return calcMstoMin(total);
};

/**
 * Formats Track Search Results
 * @param currentSongName - the current song that is being played - should be taken from the global `player` state (`player.item.name`)
 * @param results - the search track results
 * @returns an array of formatted tracks
 */
export const formatResults = (
  currentSongName: string | undefined,
  results: Player.TrackResults
): Spotify.Track[] => {
  const tracks: Spotify.Track[] = [];
  let name: string,
    duration_ms: number,
    artists: SpotifyApi.ArtistObjectSimplified[],
    uri: string,
    id: string;

  results?.map((item) => {
    if (("track" in item && !item.track) || !item) return; // making sure item.track or item is not null - sometimes it can happen.
    "track" in item
      ? ({ name, duration_ms, artists, uri, id } = item.track)
      : ({ name, duration_ms, artists, uri, id } = item);

    const flatTrack: Spotify.Track = {
      id,
      uri,
      name,
      artist: artists[0].name,
      duration: calcMstoMin(duration_ms),
      isPlaying: name === currentSongName,
    };
    tracks.push(flatTrack);
  });
  return tracks;
};
