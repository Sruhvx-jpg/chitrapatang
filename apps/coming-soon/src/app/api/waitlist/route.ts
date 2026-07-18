import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to store waitlist emails
const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "waitlist.json");

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // 1. Server-side validation
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 2. Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // 3. Read existing waitlist
    let waitlist: Array<{ email: string; timestamp: string }> = [];
    if (fs.existsSync(FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(FILE_PATH, "utf8");
        waitlist = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading waitlist.json, resetting to empty:", err);
      }
    }

    // 4. Check if already exists
    if (waitlist.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { message: "You are already on the waitlist! We will be in touch soon." },
        { status: 200 }
      );
    }

    // 5. Add new record
    waitlist.push({
      email: email.trim(),
      timestamp: new Date().toISOString(),
    });

    // 6. Save waitlist
    fs.writeFileSync(FILE_PATH, JSON.stringify(waitlist, null, 2), "utf8");

    return NextResponse.json(
      { message: "Thank you for joining our waitlist!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
