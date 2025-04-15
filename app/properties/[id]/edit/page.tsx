import { NextPage } from "next";
import EditPropertyForm from "@/components/EditPropertyForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObjects";

interface PropertyEditPageProps {
  params: {
    id: string;
  };
}

const PropertyEditPage: NextPage<PropertyEditPageProps> = async ({
  params,
}) => {
  await connectDB();

  const property = await Property.findById(params.id).lean(); // .lean() əlavə etdik

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  const serializableProperty = convertToSerializableObject(property); // serialize etdik

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <EditPropertyForm property={serializableProperty} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
