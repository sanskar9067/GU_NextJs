import { NextRequest, NextResponse } from "next/server";
import postModel from "@/app/utils/models/postModel";

export async function POST(req: NextRequest) {
    try {
        const { postid, authname, authpath, comment } = await req.json();
        const data = await postModel.findOne({ _id: postid });
        const obj = {
            name: authname, comment: comment, path: authpath
        }
        data.comments.push(obj);
        const up = await data.save();
        return NextResponse.json({
            message: "Comment Posted",
            success: true,
            data: up
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false
        }, { status: 500 });
    }
}