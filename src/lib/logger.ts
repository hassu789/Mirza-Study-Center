import { connectToDatabase } from "./mongodb";

export interface LogActivityInput {
  action: string;
  userId?: string;
  userEmail?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
}

const NINETY_DAYS_SECONDS = 90 * 24 * 60 * 60; // 7776000

/**
 * Log an activity to the activity_logs collection for audit/debugging.
 * Logs are auto-expired after 90 days via TTL index.
 */
export async function logActivity(data: LogActivityInput): Promise<void> {
  try {
    const { db } = await connectToDatabase();
    await db.collection("activity_logs").insertOne({
      action: data.action,
      userId: data.userId ?? null,
      userEmail: data.userEmail ?? null,
      metadata: data.metadata ?? {},
      ip: data.ip ?? null,
      createdAt: new Date(),
    });
  } catch (err) {
    console.warn("[logger] Failed to write activity log:", err);
  }
}
