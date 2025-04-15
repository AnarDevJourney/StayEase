"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(
  propertyId: string,
  formData: FormData
): Promise<void> {
  await connectDB();

  const sessionUser = await getSessionUser();

  const existingProperty = await Property.findById(propertyId);

  if (!existingProperty) {
    throw new Error("Property not found.");
  }

  // Verify ownership
  if (existingProperty.owner.toString() !== sessionUser?.userId) {
    throw new Error("Current user does not own this property.");
  }

  const getString = (key: string): string => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  const getNumber = (key: string): number => {
    const value = formData.get(key);
    return value ? Number(value) : 0;
  };

  const propertyData = {
    type: getString("type"),
    name: getString("name"),
    description: getString("description"),
    location: {
      street: getString("location.street"),
      city: getString("location.city"),
      state: getString("location.state"),
      zipcode: getString("location.zipcode"),
    },
    beds: getNumber("beds"),
    baths: getNumber("baths"),
    square_feet: getNumber("square_feet"),
    amenities: formData
      .getAll("amenities")
      .map((a) => (typeof a === "string" ? a : "")),
    rates: {
      weekly: getNumber("rates.weekly"),
      monthly: getNumber("rates.monthly"),
      nightly: getNumber("rates.nightly."),
    },
    seller_info: {
      name: getString("seller_info.name"),
      email: getString("seller_info.email"),
      phone: getString("seller_info.phone"),
    },
    owner: sessionUser?.userId,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
    { new: true }
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
