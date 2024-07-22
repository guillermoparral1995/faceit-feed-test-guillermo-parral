import { NextResponse, type NextRequest } from "next/server";
import MOCK_DATA from '../MOCK_DATA.json'

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams;
    const limit = Number(queryParams.get('limit')) || 20;
    const offset = Number(queryParams.get('offset')) || 0;
    const paginatedPosts = MOCK_DATA.slice(offset, offset + limit);
    return NextResponse.json(paginatedPosts, { status: 200 });
}