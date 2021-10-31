import { ListIcon } from "../../Icons/Icons";
import PlayerMenuModal from "./PlayerMenuModal";

interface Props {
  modalOpen: Player.ModalOpen;
  menuOpen: boolean;
  toggleMenuOpen: (i?: number | undefined) => void;
}

const PlayerMenu = ({ modalOpen, menuOpen, toggleMenuOpen }: Props) => {
  return (
    // Handle Button
    <div id="playerMenu" className="w-8">
      <button
        onClick={() => modalOpen("menu")}
        className="hover:scale-110 transform global-transition w-full"
      >
        <ListIcon className="stroke-current" />
      </button>
      {/* Modal */}
      <PlayerMenuModal menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
    </div>
  );
};

export default PlayerMenu;
