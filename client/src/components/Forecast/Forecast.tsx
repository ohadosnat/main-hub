import ForecastItemsWrapper from "./ForecastItemsWrapper";

// TODO: bg color update based on theme

const Forecast = () => {
  return (
    <div className="bg-[#FFF3E5] w-full shadow-md rounded-xl text-left p-6 text-black mb-4 md:w-11/12 md:mb-8 md:mx-auto lg:w-[55%] lg:h-auto lg:m-0 overflow-y-scroll lg:overflow-y-auto disable-scrollbars xl:h-full">
      <h2 className="text-4xl font-merriweather">Forecast</h2>
      <hr className="h-[1px] bg-black w-2/5 mt-2 mb-4 opacity-50 md:w-auto" />
      <ForecastItemsWrapper type="hourly" />
      <ForecastItemsWrapper type="daily" />
    </div>
  );
};

export default Forecast;
