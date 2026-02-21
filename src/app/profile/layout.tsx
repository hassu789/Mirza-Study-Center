import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Mirza Study Centre profile, update your name, change password and view your enrolled courses.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
