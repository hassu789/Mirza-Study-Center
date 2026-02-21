import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free Mirza Study Centre account to explore courses, track progress and more.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
