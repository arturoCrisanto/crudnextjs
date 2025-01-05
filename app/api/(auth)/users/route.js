import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/modals/user";
import { Types } from "mongoose";

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
    if (!body.email || !body.username || !body.password) {
      return new NextResponse(
        JSON.stringify({ message: "Please Provide all the fields" }),
        { status: 400 }
      );
    }
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
// fetching the user by ID by using the body of the request
export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;
    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: "Please Provide all the fields" }),
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ message: "User Updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in Updating Users", error }),
      { status: 500 }
    );
  }
};

// fetching the user by ID by using the URL of the request
export const DELETE = async (request) => {
  try {
    // Extracting the userId from the URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    // Check if the userId is provided
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "Please Provide User ID" }),
        { status: 400 }
      );
    }
    // Check if the provided ID is a valid ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }
    // Connect to the database
    await connect();

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);
    // If the user is not found, return 404
    if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
        status: 404,
      });
    }
    // Return the deleted user
    return new NextResponse(
      JSON.stringify({ message: "User Deleted", user: deletedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in Deleting Users", error }),
      { status: 500 }
    );
  }
};
