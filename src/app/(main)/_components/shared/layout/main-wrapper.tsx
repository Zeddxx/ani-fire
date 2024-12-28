"use client";

import Sidebar from "./sidebar";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
