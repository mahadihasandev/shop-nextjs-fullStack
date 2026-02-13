import Link from "next/link";
import { Title } from "./ui/text";
import Image from "next/image";
import { banner_1, banner_2 } from "@/images";

const StaticHomeBanner = () => {
  return (
    <div className="md:flex  gap-3">
      <div className="py-16 md:w-[50%] mt-4 md:py-0 h-40 md:h-50 bg-shop_light_pink rounded-lg px-10 lg:px-10 flex items-center justify-between">
        <div>
          <Title className="pb-5 font-sans">
            Grab 100 to 500 Tk off  on<br />
            Selected Product
          </Title>
          <Link
            href={{ pathname: "/shop", query: { price: "100-500" } }}
            className="bg-shop_dark_blue/90 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-shop_light_blue hover:text-white hoverEffect"
          >
            Buy Now
          </Link>
        </div>
        <div>
          <Image
            className="scale-80 md:scale-100"
            height={100}
            width={250}
            src={banner_1}
            alt="Headphone"
          />
        </div>
      </div>

      <div className="py-16 h-40 md:h-50 md:w-[50%] md:mt-4 md:py-0 bg-green-100 rounded-lg px-10 lg:px-10 flex items-center justify-between">
        <div>
          <Title className="pb-5 font-sans">
            Get 1000 to 2000 Tk off on<br />
            Selected Product
          </Title>
          <Link
            href={{ pathname: "/shop", query: { price: "1000-2000" } }}
            className=" bg-shop_dark_blue/90 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-shop_light_blue hover:text-white hoverEffect"
          >
            Buy Now
          </Link>
        </div>
        <div>
          <Image
            className="scale-80 md:scale-100"
            height={100}
            width={210}
            src={banner_2}
            alt="Headphone"
          />
        </div>
      </div>
    </div>
  );
};

export default StaticHomeBanner;
