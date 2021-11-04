// Router DOM & Redux
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGlobal, selectUser } from "../../redux/store";
// Hooks & Utils
import useForm from "../../utils/hooks/useForm";
import { locationFormHandle } from "../../utils/weather";
// Components
import Input from "../../components/Input/Input";
import { EarthIcon } from "../../components/Icons/Icons";

const WeatherEmptyState = () => {
  const [values, changeHandle] = useForm({ location: "" });
  const { uid } = useSelector(selectUser);
  const { message } = useSelector(selectGlobal);

  // If there's no user, return this state.
  if (!uid) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center z-[1]">
        <h1 className="text-2xl font-medium mb-2">
          🌍 Hey, Please login to continue 🌍
        </h1>
        <p className="mb-6">
          Visit the{" "}
          <Link to="/settings" className="font-medium underline">
            Settings
          </Link>{" "}
          page to login to your account or signup for a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center z-[1]">
      <h1 className="text-2xl font-medium mb-2">
        Hey, Please enter a location
      </h1>
      <p className="mb-6">
        You can always change your location in the{" "}
        <Link to="/settings" className="font-medium underline">
          Settings
        </Link>
      </p>
      <form
        className="w-full md:w-4/6 lg:w-3/6 px-6 flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0"
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
        <input
          type="submit"
          value="🌍 Add"
          className="global-transition cursor-pointer font-light rounded-md text-center py-2 px-5 shadow-md bg-black text-white transform hover:scale-105 ring-white hover:ring-1 focus:ring-2"
        />
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default WeatherEmptyState;
