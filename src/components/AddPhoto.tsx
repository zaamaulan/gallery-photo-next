"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserProfile from "./UserProfile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddImageForm from "./form/AddImageForm";

interface AddPhotoProps {
  className?: string;
  userId: string;
}

export default function AddPhoto({ className, userId }: AddPhotoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Search placeholder="Search image.." /> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Image
            src={"/assets/icons/plus.svg"}
            width={24}
            height={24}
            alt="add icon"
          />
        </DialogTrigger>

        <DialogContent className="w-10/12 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload photo to ShutterScape?</DialogTitle>
            <DialogDescription>
              Add your photos to the ShutterScope collection
            </DialogDescription>
          </DialogHeader>
          <AddImageForm userId={userId} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
