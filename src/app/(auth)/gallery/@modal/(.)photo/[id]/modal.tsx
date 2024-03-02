"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    // Menggunakan state modalOpen untuk mengatur kapan modal harus dibuka atau ditutup
    if (modalOpen) {
      document.body.style.overflow = "hidden"; // Menghentikan scrolling pada body saat modal dibuka
    } else {
      document.body.style.overflow = ""; // Mengaktifkan scrolling pada body saat modal ditutup
    }
  }, [modalOpen]);

  function closeModal() {
    setModalOpen(false);
    router.back();
  }

  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/70" onClick={closeModal} />

      <div className="fixed left-1/2 top-1/2 z-20 w-11/12 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-3 md:w-7/12">
        <div className="modal-scrollbar relative flex h-auto max-h-[38rem] items-start overflow-y-auto rounded">
          {children}
          {/* <div className="relative top-0 flex-shrink-0 hidden md:block">
            <Image
              src={"/assets/icons/x-cross.svg"}
              width={24}
              height={24}
              alt="close icon"
              onClick={closeModal}
              className="cursor-pointer"
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
