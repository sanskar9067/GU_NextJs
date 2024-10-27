import userModel from "@/app/utils/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connDB from "@/app/utils/db";
import fs from "fs/promises";

const loadDb = async () => {
    await connDB();
}

loadDb();

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const phone = data.get('phone');
        const bio = data.get('bio');
        const location = data.get('location');
        const company = data.get('company');
        const position = data.get('position');
        const education = data.get('education');
        const files = data.get('files') as File;

        if (!files) {
            return NextResponse.json({ success: false });
        }

        const bufferData = await files.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        const savePath = `./public/uploads/${Date.now()}${files.name}`;

        const path = `/uploads/${Date.now()}${files.name}`;

        await fs.writeFile(savePath, buffer);


        const findUser = await userModel.findOne({ email });
        if (findUser) {
            return NextResponse.json({
                message: "User Already Exists",
                success: false
            }, { status: 500 });
        }
        else {
            const postUser = await new userModel({ name, email, password, phone, bio, path, location, company, position, education }).save();
            if (postUser) {
                return NextResponse.json({
                    message: "User Registered",
                    success: true
                }, { status: 200 });
            }
            else {
                return NextResponse.json({
                    message: "User Not Registered",
                    success: false,
                }, { status: 500 });
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, { status: 500 });
    }
}