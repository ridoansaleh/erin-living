import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import { format, differenceInMilliseconds } from "date-fns";

const sql = neon(process.env.DATABASE_URL!);

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

export async function GET() {
  try {
    const rows = await sql("SELECT * FROM maintenance");

    const resolvedRequests = rows.filter(item => item.status === "Resolved");

    const totalDiffDays = resolvedRequests.reduce((total, item) => {
      const diffMilliseconds = differenceInMilliseconds(item.resolved_at, item.created_at);
      const diffDays = diffMilliseconds / MILLISECONDS_IN_A_DAY;
      return total + diffDays;
    }, 0);

    const averageTimeToResolved = totalDiffDays / resolvedRequests.length;

    const data = {
      requests: rows,
      total_open_requests: rows.filter((item) => item.status === "Unresolved")
        .length,
      total_urgent_requests: rows.filter((item) =>
        ["Emergency", "Urgent"].includes(item.urgency)
      ).length,
      average_time_to_resolved: Math.round(averageTimeToResolved * 1000) / 1000,
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urgency, title, status, description } = body;

    if (!urgency || typeof urgency !== "string") {
      return NextResponse.json({ error: "Invalid urgency." }, { status: 400 });
    }

    if (!status || typeof status !== "string") {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const id = uuidv4();
    const statusValue = status || "Unresolved";

    const timestamp = Date.now();
    const createdAt = format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");

    await sql(
      "INSERT INTO maintenance (id, title, urgency, status, description, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, urgency, statusValue, description, createdAt]
    );

    return NextResponse.json(
      { message: "Maintenance added successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
    }

    const timestamp = Date.now();
    const resolvedAt = format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");

    // Update the task by ID
    const result = await sql(
      "UPDATE maintenance SET status = $1, resolved_at = $2 WHERE id = $3 RETURNING *",
      ["Resolved", resolvedAt, body.id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Maintenance not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Maintenance updated successfully.",
        updatedMaintenance: result[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
