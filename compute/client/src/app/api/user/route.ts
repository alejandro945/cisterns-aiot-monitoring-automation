import { createOrGetUserProvider } from "@/infrastructure/gateway/users.gateway";

/**
 * Method for processing createOrGetUserProvider requests
 * @param req - the incoming request
 * @param res - the outgoing response
 */
export async function POST(req: Request) {
    const providerUser = await req.json();
    const user = await createOrGetUserProvider(providerUser);
    return Response.json(user);
}
