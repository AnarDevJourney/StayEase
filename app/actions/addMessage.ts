"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

interface FormState {
  error?: string;
  submitted?: boolean;
}

async function addMessage(previousState: FormState, formData: FormData) {
  // Connecting to the database
  await connectDB();

  // Getting session user
  const sessionUser = await getSessionUser();

  // Checking if user logged in or nor
  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to send a message" };
  }

  // Getting recipent of message
  const recipient = formData.get("recipient");

  // Users can not send message to themselves
  if (sessionUser.userId === recipient) {
    return { error: "You can not send a message to yourself" };
  }

  // Creating new message
  const newMessage = new Message({
    sender: sessionUser.userId,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });

  // Saving in database
  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
