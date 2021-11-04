// React & Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../redux/global";
import { selectGlobal, selectUser } from "../../redux/store";
// Components
import AppIconWrapper from "../../components/AppIconWrapper/AppIconWrapper";
import PopupModal from "../../components/PopupModal/PopupModal";
import {
  SettingsIcon,
  SpaceIcon,
  WeatherIcon,
} from "../../components/Icons/Icons";

const apps: IApps[] = [
  { name: "space", icon: <SpaceIcon /> },
  { name: "weather", icon: <WeatherIcon /> },
  { name: "settings", icon: <SettingsIcon /> },
];

const Home = () => {
  const { showModal } = useSelector(selectGlobal);
  const { uid } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid || !showModal) dispatch(setShowModal(false));
    else dispatch(setShowModal(true));
  }, [uid]);

  return (
    <>
      <div className="flex space-x-2 bg-box py-5 px-5 rounded-xl">
        {apps.map((app) => (
          <AppIconWrapper key={app.name} name={app.name} icon={app.icon} />
        ))}
      </div>
      {showModal && <PopupModal />}
    </>
  );
};

export default Home;
