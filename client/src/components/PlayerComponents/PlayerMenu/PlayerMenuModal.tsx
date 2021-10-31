import { motion } from "framer-motion";
import { useState } from "react";
import { modalVariants } from "../../../utils/animationVariants";
import { ExitIcon, HistoryIcon, LoadIcon, SearchIcon } from "../../Icons/Icons";
import MenuHistory from "./MenuHistory";
import MenuSearch from "./MenuSearch";

interface Props {
  menuOpen: boolean;
  toggleMenuOpen: (i?: number | undefined) => void;
}

const PlayerMenuModal = ({ menuOpen, toggleMenuOpen }: Props) => {
  const [activeTab, setActiveTab] = useState<Player.MenuTabs>("search");

  return (
    <motion.div
      initial="closed"
      animate={menuOpen ? "open" : "closed"}
      variants={modalVariants}
      className="p-6 absolute bg-white text-black flex flex-col justify-start items-start inset-x-[5%] inset-y-[5rem] -mt-[4%] z-[2] md:inset-y-[6rem] xl:inset-x-[7%] xl:-mt-[2%] xl:top-[5rem] rounded-2xl"
    >
      <div className="flex items-center w-full mb-4 border-b pb-4">
        <div className="flex w-full items-center md:flex-grow">
          <button
            onClick={() => toggleMenuOpen()}
            className="w-8 h-8  hover:scale-110 transform global-transition active:text-indicator"
          >
            <ExitIcon className="stroke-current" />
          </button>
          <h2 className="ml-2 flex-grow text-left text-2xl font-medium capitalize">
            {activeTab === "playlist" ? "Load" : activeTab}
          </h2>
        </div>
        <div className="flex-none flex items-center md:w-auto md:mt-0">
          <button
            onClick={() => setActiveTab("history")}
            className={`w-8 h-8  hover:scale-110 transform global-transition ${
              activeTab === "history" ? "text-indicator" : ""
            }`}
          >
            <HistoryIcon className="stroke-current" />
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`w-8 h-8  hover:scale-110 transform global-transition mx-4 ${
              activeTab === "search" ? "text-indicator" : ""
            }`}
          >
            <SearchIcon className="stroke-current" />
          </button>
          <button
            onClick={() => setActiveTab("playlist")}
            className={`w-8 h-8  hover:scale-110 transform global-transition ${
              activeTab === "playlist" ? "text-indicator" : ""
            }`}
          >
            <LoadIcon className="stroke-current" />
          </button>
        </div>
      </div>
      {activeTab === "history" && <MenuHistory activeTab={activeTab} />}
      {activeTab === "search" && <MenuSearch />}
      {activeTab === "playlist" && <MenuSearch />}
      {/* FIXME: Playlist load component W.I.P */}
    </motion.div>
  );
};

export default PlayerMenuModal;
