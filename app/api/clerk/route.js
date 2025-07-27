import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server"; 

export async function POST(req) {
  try {
    const wh = new Webhook(process.env.SIGNING_SECRET); 
    const headerPayload = headers();
    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    };

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders);

    console.log("Webhook event type:", type);
    console.log("Payload data:", data);

    const userData = {
      _id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0]?.email_address,
      image: data.image_url || "", 
    };

    await connectDB();

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
  }
}
