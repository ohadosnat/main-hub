import { Link } from "react-router-dom";
import { IApps } from "../../views/Home/Home";

const AppIconWrapper = ({ name, icon }: IApps) => {
  return (
    <Link
      to={`/${name}`}
      className="transform hover:scale-110 focus:scale-105 global-transition"
    >
      <div className="bg-white border-2 border-skin rounded-xl w-20 h-20 p-4 mb-2 text-black stroke-current">
        {icon}
      </div>
      <p className="capitalize">{name}</p>
    </Link>
  );
};

export default AppIconWrapper;
