"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId: string) {
  // Connecting to the database
  await connectDB();

  // Getting session user
  const sessionUser = await getSessionUser();

  // Checking if user logged in or not
  if (!sessionUser || !sessionUser.user) {
    throw new Error("User ID is required");
  }

  // Fetching message by id
  const message = await Message.findById(messageId);

  // Checking if message exists
  if (!message) throw new Error("Message not found");

  // Verifying ownership
  if (message.recipient.toString() !== sessionUser.userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Changing status
  message.read = !message.read;

  revalidatePath("/messages", "page");

  // Saving message
  await message.save();

  return message.read;
}

export default markMessageAsRead;
