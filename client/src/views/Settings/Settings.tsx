import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import {
  CircleArrowIcon,
  EarthIcon,
  MoonIcon,
  SpotifyIcon,
  SunIcon,
} from "../../components/Icons/Icons";
import { selectSpotify, selectUser } from "../../redux/store";
import {
  clearSpotifyCredentials,
  setLocationName,
  setTheme,
} from "../../redux/user";
import { setCode } from "../../redux/spotify";

// TODO:
// [] spotify's username display and handle logout/login from here.
// [x] location display, handle change (input field)

const Settings = () => {
  // Input
  const [inputValue, setinputValue] = useState<string>("");
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { search } = useLocation();

  // Global States (Redux)
  const { uid, theme, weather, spotify } = useSelector(selectUser);
  const { authorizeURL } = useSelector(selectSpotify);
  const dispatch = useDispatch();

  // Handlers
  const toggleTheme = (type: typeof theme): void => {
    dispatch(setTheme(type));
  };

  const spotifyLogout = () => {
    dispatch(clearSpotifyCredentials(uid));
  };

  const locationChangeHandle = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue === "") return setMessage("Please enter a location 🌎");
    dispatch(setLocationName(inputValue));
    setinputValue("");
    setMessage(undefined);
  };

  // happens after clicking on login/logout
  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    if (code) dispatch(setCode(code));
  }, [search]);

  return (
    <div className="w-[90%] md:w-auto">
      <Link to="/">
        <CircleArrowIcon className="w-7 h-7 fill-current mx-auto mb-4 transform hover:scale-110 global-transition" />
      </Link>
      <div className="flex flex-col space-y-4 bg-box py-5 px-5 rounded-xl">
        {spotify.isLogged ? (
          <div className="flex items-center w-full space-x-2">
            <SpotifyIcon className="w-7 h-7 stroke-current" />
            <p className="flex-grow text-left">ohad</p>
            <Button title="logout" onClick={spotifyLogout} />
          </div>
        ) : (
          <a href={authorizeURL}>
            <Button
              className="w-full"
              title="login"
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
        {weather.locationByName ? (
          <div className="flex items-center w-full space-x-2">
            <EarthIcon className="w-7 h-7 fill-current" />
            <p className="flex-grow text-left">{weather.locationByName}</p>
            <Button title="Change" />
          </div>
        ) : (
          <form
            className="w-full flex flex-col items-center space-y-2"
            onSubmit={(e) => locationChangeHandle(e)}
          >
            <input
              type="text"
              name="city"
              placeholder="Enter Location"
              className="text-black w-full font-light rounded-md px-6 py-2 text-left border-2 border-skin"
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" title="change" className="w-full" />
            {message && <p>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
