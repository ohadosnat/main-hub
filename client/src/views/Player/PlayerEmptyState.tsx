import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/store";

const PlayerEmptyState = () => {
  const { uid } = useSelector(selectUser);

  return (
    <>
      <div className="absolute bg-[#006666] inset-0 opacity-70 z-0" />
      <div className="h-full w-full flex flex-col justify-center items-center z-[1]">
        {!uid ? (
          <>
            <h1 className="text-2xl font-medium mb-2">
              🎧 Hey, Please login to continue 🎧
            </h1>
            <p>
              Visit the{" "}
              <Link to="/settings" className="font-medium underline">
                Settings
              </Link>{" "}
              page to login to your account or signup for a new one.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium mb-2">
              🎧 Hey, Please login to your Spotify account to continue 🎧
            </h1>
            <p>
              Visit the{" "}
              <Link to="/settings" className="font-medium underline">
                Settings
              </Link>{" "}
              page to login to your Spotify account.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default PlayerEmptyState;
