"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const FormSchema: ZodType<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}> = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export default function SignUpForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/auth/sign-in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          className="border border-black focus:outline-none"
          {...register("username")}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="border border-black focus:outline-none"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
