"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // console.log(values);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
      });
    } else {
      router.push("/gallery");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border border-black focus:outline-none"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="border border-black focus:outline-none"
          type="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
