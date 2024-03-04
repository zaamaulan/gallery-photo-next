import SignUpForm from "@/components/form/SignUpForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    return null;
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-zinc-50 p-3">
      <SignUpForm />
    </div>
  );
}
