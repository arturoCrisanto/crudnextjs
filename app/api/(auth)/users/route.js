import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/modals/user";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error Fetching Users", error, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: "User is Created", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      { message: "Error in Creating Users", error },
      { status: 500 }
    );
  }
};
