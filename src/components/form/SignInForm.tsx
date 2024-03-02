"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

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
    <>
      <Card className="flex items-center p-2 w-full md:w-fit">
        <div className="relative h-[38rem] w-[26rem] hidden md:block">
          <Image
            src={"/assets/images/login-cover.png"}
            fill
            alt="login cover"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex w-[30rem] flex-col justify-between md:px-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In to ShutterScape</CardTitle>
            <CardDescription>
              Explore, Share, and Connect with ShutterScape Community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="mx-auto">
            <p>
              {"Don't have an account?"}{" "}
              <Link href={"/auth/sign-up"}>Sign Up</Link>
            </p>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
