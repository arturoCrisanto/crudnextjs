import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Note from "@/modals/notes";
import { Types } from "mongoose";
import User from "@/modals/user";

// fetch notes of a specific user by userId
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
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

    const notes = await Note.find({ user: userId });
    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error Fetching Notes", error }),
      { status: 500 }
    );
  }
};
// can handle POST request to create notes while getting userId from query params
export const POST = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const { title, description } = await request.json();

    // check if userId is valid
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }

    await connect();
    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
        status: 404,
      });
    }
    if (!title) {
      return new NextResponse(
        JSON.stringify({ message: "Title is Required" }),
        { status: 400 }
      );
    }
    const newNote = new Note({
      title,
      description,
      user: userId,
    });
    await newNote.save();
    return new NextResponse(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error Creating Notes", error }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const noteId = searchParams.get("noteId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User ID" }), {
        status: 400,
      });
    }

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

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
    if (!note) {
      return new NextResponse(JSON.stringify({ message: "Note Not Found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Deleted Successfully", note }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error Deleting Note", error }),
      { status: 500 }
    );
  }
};
