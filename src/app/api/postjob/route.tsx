import { NextRequest, NextResponse } from "next/server";
import postModel from "@/app/utils/models/postModel";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const postuser = data.get('postuser');
        const postname = data.get('postname');
        const postbio = data.get('postbio');
        const postpath = data.get('postpath');
        const organization = data.get('organization');
        const role = data.get('role');
        const emptype = data.get('emptype');
        const salary = data.get('salary');
        const about = data.get('about');
        const files = data.get('files') as File;

        if (!files) {
            return NextResponse.json({ message: "file not found", success: false });
        }

        const bufferData = await files.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        const savePath = `./public/uploads/${Date.now()}${files.name}`;

        const imgloc = `/uploads/${Date.now()}${files.name}`;

        await fs.writeFile(savePath, buffer);

        const postData = await new postModel({ postuser, postname, postbio, postpath, organization, role, emptype, salary, about, imgloc }).save();
        if (postData) {
            console.log(postData);
            return NextResponse.json({
                message: "Post Uploaded",
                success: true
            }, { status: 200 });
        }
        else {
            return NextResponse.json({
                message: "Post Not Uploaded",
                success: false,
            }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false
        }, { status: 500 })
    }
}