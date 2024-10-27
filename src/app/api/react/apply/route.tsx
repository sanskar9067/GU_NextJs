import { NextRequest, NextResponse } from "next/server";
import postModel from "@/app/utils/models/postModel";

export async function POST(req: NextRequest) {
    try {
        const { authid, postid } = await req.json();
        const data = await postModel.findOne({ _id: postid });
        console.log(authid + " " + postid);
        console.log(data);
        if (authid === data.postuser) {
            return NextResponse.json({
                message: "Can't apply to your own job post",
                success: false
            }, { status: 300 });
        }

        const n = data.applicants.length;
        let flag = false;
        for (let i = 0; i < n; i++) {
            if (data.applicants[i] === authid) {
                flag = true;
                break;
            }
        }

        if (flag) {
            return NextResponse.json({
                message: "Already applied",
                success: false
            }, { status: 300 });
        }

        data.applicants.push(authid);
        const updatedData = await data.save();
        return NextResponse.json({
            message: "Applied Successfully",
            success: true,
            data: updatedData
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false
        })
    }
}