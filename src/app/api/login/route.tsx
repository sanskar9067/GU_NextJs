import connDB from "@/app/utils/db";
import userModel from "@/app/utils/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const loadDb = async () => {
    await connDB();
}

loadDb();

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const email = data.get('email');
        const password = data.get('password');
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            if (findUser.password === password) {
                const tokenData = {
                    id: findUser._id,
                    name: findUser.name,
                    email: findUser.email,
                    phone: findUser.phone,
                    bio: findUser.bio,
                    path: findUser.path,
                    location: findUser.location,
                    company: findUser.comapany,
                    position: findUser.postion,
                    education: findUser.education
                }
                const token = jwt.sign(tokenData, process.env.JWT_KEY!, { expiresIn: '7d' });
                const response = NextResponse.json({
                    message: "User Logged In",
                    success: true,
                    user: findUser
                }, { status: 200 });
                response.cookies.set("token", token, {
                    httpOnly: true
                });
                return response;
            }
            else {
                return NextResponse.json({
                    message: "Wrong Password",
                    success: false
                }, { status: 300 });
            }
        } else {
            return NextResponse.json({
                message: "User Not Found",
                success: false
            }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            success: false
        }, { status: 500 })
    }
}