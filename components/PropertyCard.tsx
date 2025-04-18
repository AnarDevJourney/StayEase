import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

interface Property {
  _id: string;
  name: string;
  type: string;
  beds: number;
  baths: number;
  square_feet: number;
  location: {
    city: string;
    state: string;
  };
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  images: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  function getRateDisplay(rates: {
    monthly?: number;
    weekly?: number;
    nightly?: number;
  }) {
    if (rates.monthly) return `$${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly) return `$${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `$${rates.nightly.toLocaleString()}/night`;
    return "N/A";
  }

  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          alt="property image"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold h-[2.5em] overflow-hidden text-ellipsis whitespace-nowrap">
            {property.name}
          </h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay(property.rates)}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {property.square_feet}
            <span className="md:hidden lg:inline"> sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p className="">
            <FaMoneyBill className="md:hidden lg:inline" /> Weekly
          </p>
          <p>
            <FaMoneyBill className="md:hidden lg:inline" /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
