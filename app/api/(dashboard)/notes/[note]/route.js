import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Note from "@/modals/notes";
import { Types } from "mongoose";
import User from "@/modals/user";

//* fetch notes of a specific user by userId
export const GET = async (request, context) => {
  // get the noteId from the context it is a dynamic route
  const noteId = context.params.note;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    // check if the userId is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }
    // check if the noteId is valid
    if (!noteId || !Types.ObjectId.isValid(noteId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Note ID" }), {
        status: 400,
      });
    }

    await connect();
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
        status: 404,
      });
    }
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return new NextResponse(JSON.stringify({ message: "Note Not Found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error Fetching Note", error }),
      { status: 500 }
    );
  }
};
