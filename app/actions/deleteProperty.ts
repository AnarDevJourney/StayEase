"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

/**
 * Deletes a property belonging to the logged-in user and removes its images from Cloudinary.
 *
 * @param propertyId - The ID of the property to be deleted
 */
export async function deleteProperty(propertyId: string): Promise<void> {
  const sessionUser = await getSessionUser();

  // Check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Extract public ID's from image URLs
  const publicIds: string[] = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0) ?? "";
  });

  // Delete images from Cloudinary
  for (const publicId of publicIds) {
    if (publicId) {
      await cloudinary.uploader.destroy(`stayease/${publicId}`);
    }
  }

  // Delete property from database
  await property.deleteOne();

  // Revalidate cache
  revalidatePath("/", "layout");
}
