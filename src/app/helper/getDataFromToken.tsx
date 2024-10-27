import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.JWT_KEY!);
        return decodedToken;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "ISE",
            success: "false"
        }, { status: 500 })
    }
}