import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "./PropertyCard";

const HomeProperties: React.FC = async () => {
  await connectDB();

  // Fetching recent properties from database
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg font-semibold">No properties found</p>
              <p>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
