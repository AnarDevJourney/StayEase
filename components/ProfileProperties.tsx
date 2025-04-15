"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

interface PropertyType {
  _id: string;
  name: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    [key: string]: any;
  };
  images: string[];
  [key: string]: any;
}

interface ProfilePropertiesProps {
  properties: any[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({
  properties: initialProperties,
}) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;

    try {
      await deleteProperty(propertyId);
      const updatedProperties = properties.filter(
        (property) => property._id !== propertyId
      );
      setProperties(updatedProperties);
      toast.success("Property Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      <a href="/property.html">
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt="Property 1"
          width={1000}
          height={200}
        />
      </a>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
