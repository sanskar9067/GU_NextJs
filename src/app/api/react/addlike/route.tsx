import { NextRequest, NextResponse } from "next/server";
import postModel from "@/app/utils/models/postModel";

export async function POST(req: NextRequest) {
    try {
        const { likeid, postid } = await req.json();
        const data = await postModel.findOne({ _id: postid });
        const n = data.likes.length;
        let flag = false;
        for (let i = 0; i < n; i++) {
            if (data.likes[i] === likeid) {
                flag = true;
                break;
            }
        }
        if (flag) {
            return NextResponse.json({
                message: "Already Liked",
                success: false,
            }, { status: 300 });
        }

        data.likes.push(likeid);
        const updatedPost = await data.save();

        return NextResponse.json({
            message: "Post Liked",
            success: true,
            data: updatedPost
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false
        }, { status: 500 });
    }
}