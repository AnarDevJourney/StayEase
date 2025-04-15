import { NextPage } from "next";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

interface PropertiesPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

const PropertiesPage: NextPage<PropertiesPageProps> = async ({
  searchParams,
}) => {
  // Connecting to the database
  await connectDB();

  // Parsing page and pageSize from query parameters (fallback to default values if missing)
  const currentPage = parseInt(searchParams.page || "1", 10);
  const currentPageSize = parseInt(searchParams.pageSize || "9", 10);

  // Calculating how many documents to skip for pagination
  const skip = (currentPage - 1) * currentPageSize;

  // Count total number of properties in the database
  const total = await Property.countDocuments({});

  // Fetching properties for the current page using skip and limit
  const properties = await Property.find({}).skip(skip).limit(currentPageSize);

  // Checking if pagination is needed
  const showPagination = total > currentPageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold">No properties found</p>
            <p>Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {showPagination && (
          <Pagination
            page={currentPage}
            pageSize={currentPageSize}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
