"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessageCount() {
  // Connecting to the database
  await connectDB();

  // Getting session user
  const sessionUser = await getSessionUser();

  // Checking if user is logged in or not
  if (!sessionUser || !sessionUser.user) {
    return { error: "User ID is required" };
  }

  // Fetching user's unread messages
  const count = await Message.countDocuments({
    recipient: sessionUser.userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;
