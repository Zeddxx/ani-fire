import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server"

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard!"
        );
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix_id');
    const svix_timestamp = headerPayload.get("svix_timestamp");
    const svix_signature = headerPayload.get('svix_signature');

    if(!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers.", {
            status: 400
        });
    }

    const payload = await req.json()
    const body = JSON.stringify(payload);
}