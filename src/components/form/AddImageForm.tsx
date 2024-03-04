"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { addPhoto } from "@/actions/add-image"; // Hapus import duplikat
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Maximum description length 100 characters"),
});

export default function AddImageForm({ userId, onClose }: { userId: string,onClose: () => void}) {
  const [file, setFile] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };
  // const router = useRouter();
  // const { toast } = useToast();

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(FormSchema),
  // });

  // const onSubmit = async (values) => {
  //   const addPhotoData = await addPhoto({
  //     title: values.title,
  //     description: values.description,
  //   });

  //   if (addPhotoData.error) {
  //     toast({
  //       title: "Error",
  //       description: "Oops! Something went wrong",
  //     });
  //   } else {
  //     router.push("/gallery");
  //   }
  // };

  return (
    <form action={addPhoto} className="space-y-4" onSubmit={onClose}>
      <Input type="hidden" value={userId} />
      <div className="space-y-2">
        <Label className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="title">
          Title
        </Label>
        <Input
          type="title"
          placeholder="Type your photo title here."
          name="title"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="description">
          Description
        </Label>
        <Textarea
          placeholder="Type your photo description here."
          name="description"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="file">
          Photo
        </Label>
        <Input
          type="file"
          accept="image/*"
          required
          onChange={handleChange}
          name="file"
        />
      </div>
      <Image
        src={file}
        width={144}
        height={144}
        alt=""
        className={file ? "block" : "hidden"}
      />
      <Button type="submit" className="w-full" >Upload</Button>
    </form>
  );
}
