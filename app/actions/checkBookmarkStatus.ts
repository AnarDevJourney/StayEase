"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId: string) {
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

  return { isBookmarked };
}

export default checkBookmarkStatus;
