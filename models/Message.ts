import { Schema, model, models, Document, Types } from "mongoose";

interface IMessage {
  _id?: Types.ObjectId;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  property: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
