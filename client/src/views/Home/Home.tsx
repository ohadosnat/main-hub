import AppIconWrapper from "../../components/AppIconWrapper/AppIconWrapper";
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
  return (
    <div className="flex space-x-2 bg-box py-5 px-5 rounded-xl">
      {apps.map((app) => (
        <AppIconWrapper key={app.name} name={app.name} icon={app.icon} />
      ))}
    </div>
  );
};

export default Home;
