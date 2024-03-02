import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import moment from "moment";
// import "moment/locale/id";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import SignOut from "./SignOut";

const components = [
  { title: "My Photos", href: "/gallery/my-photo" },
  { title: "My Album", href: "/gallery/my-photo" },
  // { title: "My Photos", href: "/gallery/my-photo" },
];

export default async function UserProfile() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email!;

  const users = await db.user.findUnique({
    where: { email: userEmail },
  });
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/assets/icons/user.svg"}
            width={24}
            height={24}
            alt="user ic"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My profile</SheetTitle>
            <SheetDescription>
              Manage your account details and personalize your profile settings
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={users?.fullname} className="col-span-3" />
            </div> */}
            <div className="grid items-center gap-4 md:grid-cols-4">
              <Label htmlFor="username" className="md:text-right">
                Username
              </Label>
              <Input
                id="username"
                value={users?.username}
                className="md:col-span-3"
                readOnly={true}
              />
            </div>
            <div className="grid items-center gap-4 md:grid-cols-4">
              <Label htmlFor="email" className="md:text-right">
                Email
              </Label>
              <Input
                id="email"
                value={users?.email}
                className="md:col-span-3"
                readOnly={true}
              />
            </div>
            <p className="text-center sm:text-right">
              Joined on{" "}
              {moment.utc(users?.createdAt).local().format("MMMM DD, YYYY")}
            </p>
            <SheetFooter className="relative bottom-0">
              <SheetClose>
                <SignOut />
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
