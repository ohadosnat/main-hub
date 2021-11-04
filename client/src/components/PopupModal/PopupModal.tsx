// React & React DOM
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setShowModal } from "../../redux/global";
// Components & Animation
import { ExitIcon } from "../Icons/Icons";
import { motion } from "framer-motion";
import { PopupModalVariants } from "../../utils/animationVariants";

const PopupModal = () => {
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  const handleClose = () => dispatch(setShowModal(false));

  useEffect(() => {
    const isVisited = localStorage.getItem("visited");
    if (isVisited === "true") return setIsFirstTime(false);

    localStorage.setItem("visited", "false"); // sets the initial value
    setIsFirstTime(true);
    localStorage.setItem("visited", "true"); // sets to visited.
  }, []);

  return (
    <motion.div
      initial="start"
      animate="end"
      variants={PopupModalVariants}
      className="fixed top-20 md:top-auto md:bottom-28 xl:bottom-6 2xl:bottom-10 py-3 px-9 text-white bg-indicator rounded-xl font-light"
    >
      <button
        onClick={handleClose}
        className="w-7 h-7 text-black bg-white rounded-full absolute -top-2 -right-2 transform hover:scale-110 global-transition cursor-pointer"
      >
        <ExitIcon className="stroke-current" />
      </button>
      {isFirstTime ? (
        <p>
          ✨ It Seems you're new here! ✨ <br />
          <Link to="/signup" className="underline font-normal">
            Create an account
          </Link>{" "}
          to enjoy the app's features
        </p>
      ) : (
        <p>
          It seems you're not logged in, <br />
          <Link to="/login" className="underline font-normal">
            Login
          </Link>{" "}
          to continue enjoying the app.
        </p>
      )}
    </motion.div>
  );
};

export default PopupModal;
