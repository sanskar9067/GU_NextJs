import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import connDB from "@/app/utils/db";

const loadDb = async () => {
    await connDB();
}

loadDb();

export async function GET(req: NextRequest) {
    try {
        const userData = await getDataFromToken(req);
        return NextResponse.json({
            data: userData,
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "ISE",
            success: false
        }, { status: 200 });
    }
}