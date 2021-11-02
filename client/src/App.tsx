import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Content from "./views/Content/Content";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal, selectUser } from "./redux/store";
import { useClock } from "./utils/hooks/useClock";
import { setPageTheme, setContainerHeight, toggleNight } from "./redux/global";
import { setTheme } from "./redux/user";
import useAuth from "./utils/hooks/useAuth";
import useSpotifyAuth from "./utils/hooks/useSpotifyAuth";
import { motion } from "framer-motion";
import LoadingAnimation from "./components/Loading/LoadingAnimation";
import { useSpotifyWebPlayback } from "./utils/hooks/useSpotifyWebPlayback";
import { useSpotifyWebApi } from "./context/spotifyWebApiContext";
import { AppVariants } from "./utils/animationVariants";

function App() {
  // Global States (Redux)
  const { weather, theme } = useSelector(selectUser);
  const { isNight, pageTheme, containerHeight, isLoading } =
    useSelector(selectGlobal);
  const dispatch = useDispatch();

  // Custom Hooks
  const { pathname } = useLocation();
  const clock = useClock();
  useAuth();
  useSpotifyAuth();
  useSpotifyWebPlayback();
  useSpotifyWebApi();

  // useEffects
  useEffect(() => {
    dispatch(toggleNight(clock));
  }, [clock]);

  useEffect(() => {
    dispatch(setPageTheme({ pathname, isNight }));
  }, [pathname, isNight]);

  useEffect(() => {
    dispatch(
      setContainerHeight({
        pathname,
        locationByName: weather.locationByName,
      })
    );
  }, [pathname, weather.locationByName]);

  useEffect(() => {
    if (pathname === "/player") return;
    dispatch(setTheme(theme));
  }, [pathname, theme]);

  return (
    <div className={`${pathname !== "/player" && theme} ${pageTheme}`}>
      <div
        className={`global-transition overflow-x-hidden text-center h-screen font-rubik bg-skin
        xl:flex xl:justify-center xl:items-center`}
      >
        {isLoading ? (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={AppVariants}
            className="fixed inset-0 flex justify-center items-center"
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.section
            initial="closed"
            animate="open"
            variants={AppVariants}
            className={`${containerHeight} relative text-skin
          bg-main bg-gradient-to-bl from-skin-start via-skin-middle to-skin-end
          xl:h-[70%] xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-[70%]`}
          >
            <Overlay clock={clock} pathname={pathname} />
            <Content />
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default App;

/*



TODO:

General
[x] loading state implementation (page/component, animation, might use Lottie or even React Spring/Framer Motion to animate the svg)
  - used Framer Motion
[x] logged out state (initial welcome)
  [x] on weather, there's a "gate" to make sure someone is logged in
  [x] on player, add "gate" sate to make sure someone is logged in (same as weather)
  - on main page all the same (can add locks to the icons to let the user know that he must login to continue)
    [x] can also add a "It seems you're new here, create an account to enjoy all of the app's features" (know through localStorage count key)
    [x] if the user is not logged in and it's not the first time, than do nothing (can maybe add a "it seems you're not logged in - LOGIN BUTTON")
  - 
[x] logout/login buttons in settings
  [x] logout - works
  [x] login - works but need to add input fields for the user to enter his/hers creds.

  - COMMIT AFTER THAT ✅

  [x] take a look at graphql to fetch only the data that I need and make the requests smaller (for both spotify and OpenWeather).
    - only for OpenWeather API, the Spotify's API is being called from a package, so can't control the requests.
  [x] take a look at React Query to see if I can use it to fetch any data more easliy.
  - update: after looking to it, I could use it for the weather info to save some time but overall it's not a must.

Player
[x] spotify login in player
  [x] routes requests - user info, playlists, search, song info.
    - used a client wrapper for making requests (not auth)
  [x] player playback functions (current, shuffle, repeat, next/previous, play/pause and such...)
  [x] interfaces for each player function:
    [x] search (show by songs, albums, artists, podcasts)
    [x] playlist (song list, name, creator, image, follow/unfollow buttons)
      [-] maybe search inside the playlist to filter - for now it'll pass
      [x] info
      [x] un/follow button.
    [x] load playlist by link
    [-] player overlay button with the option to like/unlike songs or the current playlist.
    [x] see play history (from the api, if not, I'll just save a local state - only the last 10).
    [x] volume
    [x] might add more...
  [x] mini player will have to use the same local spotify state and control the player (and update!)
    [-] maybe show the song info when a song starts to play (for 5 seconds)
  [-] check for routes, to have the player's menu overlay -  I need this when a user clicks on a playlist or an album it will direct him to the route with the album's info.
    - If I move between routes, I need to remember the past results in a global state (might add it to the Spotify state under "searchResults")
    - make the design responsive (should be easy)
    - routes might be something like that:
      "player/search" (might add queries = "player/search?search=brockhampton" and fetch data based on that if there is one),
      "player/search/album/:id" AND "player/search/playlist/:id" - for playlists and albums.
    [x] UPDATE: Didn't make the final cut, no routes, works great.

  - COMMIT AFTER THAT ✅

Weather
[] backend/client routes
[] util functions
[] local redux state
  [] + might save some weather info on localStorage since it's not sensitive data,
    and I can reduce API calls if I have the data already can also add a timestamp to see if the data is not too old.
[] set up an interval to update every 1 hour (maybe even more to reduce calls)
  [] instead of interval, I can add a "refresh" button at the top that also have "last updated at: 14:20" - this will reduce the api calls
    - (MAYBE) when a user enters the "weather" page, fetch the data ONLY IF the data is 5 hours old.
[] update the overlay's tempature with the current one.

OPTIONALS:

Navigation - currently not in use
[] at this moment, there will be no navigation BUT I might replace it with the movies watchlist app.

Watchlist - MAYBE
[] if I'll do it, than each user can add/remove a film and toggle the watch status. see watched films and unwatched.
  [] films that are on "watched" state, will be moved to a different tab, so that user will see all of his/hers watched films (and the same for "unwatched" films)
  [] this will be stored in a local state (redux), and on the user's document on Firestore.
    [] IMPORTANT - this mean I need to update the user's document structure to have ability to add watchlist film names.
*/
