import ForecastItemsWrapper from "./ForecastItemsWrapper";

const Forecast = () => {
  return (
    <div className="z-[1] bg-white w-full shadow-md rounded-xl text-left p-6 pr-0 text-black mb-4 md:w-11/12 md:mb-8 md:mx-auto lg:w-3/5 lg:h-auto lg:m-0 overflow-y-scroll lg:overflow-y-auto disable-scrollbars xl:h-full xl:w-2/5 2xl:h-5/6">
      <h2 className="text-4xl font-merriweather">Forecast</h2>
      <hr className="h-[1px] bg-black w-2/5 mt-2 mb-4 opacity-50 md:w-1/5" />
      <ForecastItemsWrapper type="hourly" />
      <ForecastItemsWrapper type="daily" />
    </div>
  );
};

export default Forecast;
