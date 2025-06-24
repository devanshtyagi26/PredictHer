import { connect } from "@/dbConnection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { userName, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User Already Exists", status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
