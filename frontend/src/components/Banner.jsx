
import { useNavigate } from "react-router-dom";
import bannerData from "../data/banner.json"; 

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">

      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>{bannerData.title}</p>
          <p className="mt-4">{bannerData.subtitle}</p>
        </div>
        <button
          onClick={() => {
            navigate(bannerData.buttonLink);
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          {bannerData.buttonText}
        </button>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={bannerData.image}
          alt="appointment banner"
        />
      </div>
    </div>
  );
};

export default Banner;
