import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Mirza Study Centre account to access your dashboard, courses and progress.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
