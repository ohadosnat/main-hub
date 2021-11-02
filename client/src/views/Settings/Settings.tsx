import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { selectGlobal, selectSpotify, selectUser } from "../../redux/store";
import { clearSpotifyCredentials, setTheme } from "../../redux/user";
import { clearPlayerState, setCode } from "../../redux/spotify";
import { logout } from "../../utils/auth";
import Input from "../../components/Input/Input";
import useForm from "../../utils/hooks/useForm";
import {
  CircleArrowIcon,
  EarthIcon,
  MoonIcon,
  SpotifyIcon,
  SunIcon,
  UserIcon,
  WaveIcon,
} from "../../components/Icons/Icons";
import { locationFormHandle } from "../../utils/weather";

const Settings = () => {
  // Input
  const [showInput, setShowInput] = useState<boolean>(true);

  const [values, changeHandle] = useForm({ location: "" });
  const { search } = useLocation();

  // Global States (Redux)
  const { uid, theme, weather, spotify } = useSelector(selectUser);
  const { authorizeURL, name } = useSelector(selectSpotify);
  const { message } = useSelector(selectGlobal);
  const dispatch = useDispatch();

  // Handlers
  const toggleTheme = (type: typeof theme): void => {
    dispatch(setTheme(type));
  };

  // Clears the Spotify Global State & The users tokens (global & Firestore)
  const spotifyLogout = (): void => {
    dispatch(clearSpotifyCredentials(uid));
    dispatch(clearPlayerState());
  };

  // Sets the current showInput value based if the user have a location set.
  useEffect(() => {
    if (!weather.locationByName || !uid) return setShowInput(true);
    else setShowInput(false);
  }, [uid, weather.locationByName]);

  // happens after clicking on the spotify login button
  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    if (code) dispatch(setCode(code));
  }, [search]);

  return (
    <div className="w-[90%] md:w-auto lg:w-4/12 2xl:w-3/12">
      <Link to="/">
        <CircleArrowIcon className="w-7 h-7 fill-current mx-auto mb-4 transform hover:scale-110 global-transition" />
      </Link>
      <div className="flex flex-col space-y-4 bg-box py-5 px-5 rounded-xl">
        {/* Check for Active User */}
        {!uid ? (
          <>
            <Link to="/login" className="w-full">
              <Button
                className="w-full"
                title="Login"
                startIcon={<UserIcon className="w-7 h-7 stroke-current" />}
              />
            </Link>
            <p>OR</p>
            <Link to="/signup" className="w-full">
              <Button
                className="w-full"
                title="signup"
                startIcon={<WaveIcon className="w-7 h-7 stroke-current" />}
              />
            </Link>
          </>
        ) : (
          <>
            {/* Check for Spotify Account */}
            {spotify.isLogged ? (
              <div className="flex items-center w-full space-x-2">
                <SpotifyIcon className="w-7 h-7 stroke-current" />
                <p className="flex-grow text-left">{name}</p>
                <Button title="logout" onClick={spotifyLogout} />
              </div>
            ) : (
              <a href={authorizeURL}>
                <Button
                  className="w-full"
                  title="spotify login"
                  startIcon={<SpotifyIcon className="w-7 h-7 stroke-current" />}
                />
              </a>
            )}
            <div className="flex justify-between space-x-2">
              <Button
                onClick={() => toggleTheme("dark")}
                className={`${theme === "dark" && "current"} flex-grow`}
                title="dark"
                startIcon={<MoonIcon className="w-7 h-7 stroke-current" />}
              />
              <Button
                onClick={() => toggleTheme("light")}
                className={`${theme === "light" && "current"} flex-grow`}
                title="light"
                startIcon={<SunIcon className="w-7 h-7 stroke-current" />}
              />
            </div>
            {showInput ? (
              <form
                className="w-full flex flex-col items-center space-y-2"
                onSubmit={(e) => locationFormHandle(e, values)}
              >
                <Input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={values.location}
                  onChange={changeHandle}
                  startIcon={
                    <EarthIcon className="flex-none w-7 h-7 fill-current mr-2" />
                  }
                />
                <Button type="submit" title="change" className="w-full" />
              </form>
            ) : (
              <div className="flex items-center w-full space-x-2">
                <EarthIcon className="w-7 h-7 fill-current" />
                <p className="flex-grow text-left">{weather.locationByName}</p>
                <Button
                  title="Change"
                  onClick={() => setShowInput(!showInput)}
                />
              </div>
            )}
            <Button
              title="logout"
              startIcon={<UserIcon className="w-7 h-7 stroke-current" />}
              onClick={() => logout()}
            />
          </>
        )}
      </div>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Settings;
