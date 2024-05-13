import { getLastPayment } from "@/infrastructure/gateway/payment-gateway";

/**
 * Function for processing GET requests
 * In this case, it retrieves the last payment for a user
 * @param req - the incoming request
 * @returns the last payment for a user
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || '';
    const lastPayment = await getLastPayment(userId);
    return Response.json(lastPayment);
}