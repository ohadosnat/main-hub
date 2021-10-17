import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import {
  CircleArrowIcon,
  EarthIcon,
  MoonIcon,
  SpotifyIcon,
  SunIcon,
} from "../../components/Icons/Icons";
import { selectUser } from "../../redux/store";
import { setLocationName, setTheme } from "../../redux/user";

// TODO:
// [] spotify's username display and handle logout/login from here.
// [x] location display, handle change (input field)

const Settings = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputValue, setinputValue] = useState<string>("");
  const [message, setMessage] = useState<string | undefined>(undefined);

  // Global States (Redux)
  const { theme, player, weather } = useSelector(selectUser);
  const dispatch = useDispatch();

  // Handlers
  const toggleInput = (): void => setShowInput(!showInput);

  const handleThemeButtonClick = (type: typeof theme): void => {
    dispatch(setTheme(type));
  };

  const handleLocationChange = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue === "") return setMessage("Please enter a location 🌎");
    dispatch(setLocationName(inputValue));
    setShowInput(!showInput);
    setinputValue("");
    setMessage(undefined);
  };

  useEffect(() => {
    if (!weather.locationByName) setShowInput(true);
  }, []);

  return (
    <div className="w-[90%] md:w-auto">
      <Link to="/">
        <CircleArrowIcon className="w-7 h-7 fill-current mx-auto mb-4 transform hover:scale-110 global-transition" />
      </Link>
      <div className="flex flex-col space-y-4 bg-box py-5 px-5 rounded-xl">
        {player.isLogged ? (
          <div className="flex items-center w-full space-x-2">
            <SpotifyIcon className="w-7 h-7 stroke-current" />
            <p className="flex-grow text-left">ohad</p>
            <Button title="logout" />
          </div>
        ) : (
          <Button
            title="login"
            startIcon={<SpotifyIcon className="w-7 h-7 stroke-current" />}
          />
        )}
        <div className="flex justify-between space-x-2">
          <Button
            onClick={() => handleThemeButtonClick("dark")}
            className={`${theme === "dark" && "current"} flex-grow`}
            title="dark"
            startIcon={<MoonIcon className="w-7 h-7 stroke-current" />}
          />
          <Button
            onClick={() => handleThemeButtonClick("light")}
            className={`${theme === "light" && "current"} flex-grow`}
            title="light"
            startIcon={<SunIcon className="w-7 h-7 stroke-current" />}
          />
        </div>
        {!showInput ? (
          <div className="flex items-center w-full space-x-2">
            <EarthIcon className="w-7 h-7 fill-current" />
            <p className="flex-grow text-left">{weather.locationByName}</p>
            <Button title="Change" onClick={toggleInput} />
          </div>
        ) : (
          <form
            className="w-full flex flex-col items-center space-y-2"
            onSubmit={(e) => handleLocationChange(e)}
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
