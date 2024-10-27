import { NextResponse } from "next/server";
import postModel from "@/app/utils/models/postModel";
import connDB from "@/app/utils/db";

const loadDb = async () => {
    await connDB();
}

loadDb();
export async function GET() {
    try {
        const postdata = await postModel.find().sort({ createdAt: -1 });
        return NextResponse.json({
            postdata
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            suucees: false
        }, { status: 500 });
    }
}