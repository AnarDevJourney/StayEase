"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId: string) {
  // Connecting to the database
  await connectDB();

  // Getting session user
  const sessionUser = await getSessionUser();

  // Checking if session user exists
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  // Getting user data from database
  const user = await User.findById(sessionUser.userId);

  // Checking if user's bookmarks includes this property or not
  let isBookmarked = user.bookmarks.includes(propertyId);

  // Message variable
  let message;

  // Handling bookmark
  if (isBookmarked) {
    // If already bookmarked then remove
    user.bookmarks.pull(propertyId);
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    // If not bookmarked then add
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }

  // Saving user data
  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
