"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";

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
    console.log(values);

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
    <Card className="flex items-center p-2 w-full md:w-fit">
      <div className="flex w-[30rem] flex-col justify-between md:px-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up to ShutterScape</CardTitle>
          <CardDescription>
            Join Now to Explore, Share, and Connect with the ShutterScape
            Community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium" htmlFor="username">
                Username
              </Label>
              <Input type="text" {...register("username")} />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-medium" htmlFor="email">
                Email
              </Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-medium" htmlFor="password">
                Password
              </Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-medium" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mx-auto">
          <p>
            {"Already have an account?"}{" "}
            <Link href={"/auth/sign-in"}>Sign In</Link>
          </p>
        </CardFooter>
      </div>
      <div className="relative h-[38rem] w-[26rem] hidden md:block">
        <Image
          src={"/assets/images/regist-cover.png"}
          fill
          alt="register cover"
          className="rounded-lg object-cover"
        />
      </div>
    </Card>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       className="border border-black focus:outline-none"
    //       {...register("username")}
    //     />
    //     {errors.username && <span>{errors.username.message}</span>}
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       className="border border-black focus:outline-none"
    //       {...register("email")}
    //     />
    //     {errors.email && <span>{errors.email.message}</span>}
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input
    //       className="border border-black focus:outline-none"
    //       type="password"
    //       {...register("password")}
    //     />
    //     {errors.password && <span>{errors.password.message}</span>}
    //   </div>
    //   <div>
    //     <label htmlFor="confirmPassword">Confirm Password</label>
    //     <input
    //       className="border border-black focus:outline-none"
    //       type="password"
    //       {...register("confirmPassword")}
    //     />
    //     {errors.confirmPassword && (
    //       <span>{errors.confirmPassword.message}</span>
    //     )}
    //   </div>

    //   <button type="submit">Submit</button>
    // </form>
  );
}
