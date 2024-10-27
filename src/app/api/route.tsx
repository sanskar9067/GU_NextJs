import connDB from "@/app/utils/db";
import { NextResponse } from "next/server";

const loadDb = async () => {
    await connDB();
}

loadDb();

export async function GET() {
    return NextResponse.json({ msg: "Server Started" });
}