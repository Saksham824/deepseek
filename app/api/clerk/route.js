import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {
    try {
        const wh = process.env.CLERK_WEBHOOK_SECRET;
        const headerPayload = await headers()
        const svixHeaders = {
            "svix-id": headerPayload.get("svix-id"),
            "svix-timestamp": headerPayload.get("svix-timestamp"),
            "svix-signature": headerPayload.get("svix-signature"),
        }
        // Get the payload and verify it
        const payload = await req.json();
        const body = JSON.stringify(payload);
        const { data, type } = wh.verify(body, svixHeaders);
        // User data saved to the database
        const userData = {
            _id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email_addresses[0].email_address,
            image: image_url,
        }
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
            default:
                break;
        }
        return NextRequest.json({ message: "Webhook processed successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error processing webhook:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}