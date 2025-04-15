"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId: string) {
  // Connecting to the database
  await connectDB();

  // Getting session user
  const sessionUser = await getSessionUser();

  // Checking if user logged in or not
  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  // Fetching Message
  const message = await Message.findById(messageId);

  // Checking if message exists
  if (!message) throw new Error("Message Not Found");

  // Verifying ownership
  if (message.recipient.toString() !== sessionUser.userId) {
    throw new Error("Unauthorized");
  }

  // Revalidating cache
  revalidatePath("/messages", "page");

  // Deleting message from database
  await message.deleteOne();
}

export default deleteMessage;
