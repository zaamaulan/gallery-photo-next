import React from "react";

export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div id="modal-photo" />
      {children}
      {modal}
    </div>
  );
}
