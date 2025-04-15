import { NextPage } from "next";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObjects";
import PropertyCard from "@/components/PropertyCard";
import SearchPropertyForm from "@/components/SearchPropertyForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface SearchResultsPageProps {
  searchParams: {
    location: string;
    propertyType: string;
  };
}

const SearchResultsPage: NextPage<SearchResultsPageProps> = async ({
  searchParams: { location, propertyType },
}) => {
  // Connect to the database
  await connectDB();

  // Fetch properties
  const locationPattern = new RegExp(location, "i");

  // Matching location pattern against database fields
  let query: any = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  // Checking property type
  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  // Making database query
  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializableObject);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchPropertyForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={String(property._id)}
                  property={property as any}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
