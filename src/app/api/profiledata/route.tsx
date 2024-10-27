import userModel from "@/app/utils/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import connDB from "@/app/utils/db";

const loadDb = async () => {
    await connDB();
}

loadDb();

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        console.log(id);
        const userData = await userModel.findOne({ _id: id }).select("-password");
        if (userData) {
            return NextResponse.json({
                data: userData,
                success: true
            }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "ISE",
            success: false
        }, { status: 500 });
    }
}