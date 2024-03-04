'use client'
import React, { ChangeEventHandler, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { addPhoto } from "@/actions/add-image";
import { cn } from "@/lib/utils";

export default function AddImageModal({ userId }: { userId: string }) {
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false)
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {" "}
        <Image
          src={"/assets/icons/plus.svg"}
          width={24}
          height={24}
          alt="add icon"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload photo to ShutterScape?</DialogTitle>
          <DialogDescription>
            Add your photos to the ShutterScope collection
          </DialogDescription>
        </DialogHeader>
        <form action={addPhoto} className="space-y-4">
          <input type="hidden" value={userId} name="userId" />
          <div className="space-y-2">
            <Label
              className="font-medium after:ml-0.5 after:text-red-500 after:content-['*'] "
              htmlFor="title"
            >
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Type your photo title here."
            />
            {/* Menggunakan id yang sesuai */}
            {/* {errors.title && <p className="text-red-500">{errors.title.message}</p>} */}
          </div>
          <div className="space-y-2">
            <Label
              className="font-medium after:ml-0.5 after:text-red-500 after:content-['*'] "
              htmlFor="description"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              className="resize-none"
              placeholder="Type your photo description here."
            />
            {/* Menggunakan id yang sesuai */}
            {/* {errors.description && <p className="text-red-500">{errors.description.message}</p>} */}
          </div>
          <div className="space-y-2">
            <Label
              className="font-medium after:ml-0.5 after:text-red-500 after:content-['*'] "
              htmlFor="file"
            >
              Photo
            </Label>
            <Input
              type="file"
              id="file"
              name="file"
              required
              onChange={handleChange}
              accept="image/*"
            />
            {/* Menggunakan id yang sesuai */}
            {/* {errors.description && <p className="text-red-500">{errors.description.message}</p>} */}
            <Image
              src={file}
              width={144}
              height={144}
              alt={""}
              className={cn("rounded", file ? "block" : "hidden")}
            />
          </div>

          {/* Mengubah menjadi tag button */}
        </form>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" className="w-full">
              Upload
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
