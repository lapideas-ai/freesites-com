import type { Metadata } from "next";
import "./friendshipfoundation.css";

export const metadata: Metadata = {
  title: "Friendship Foundation Design Mockups | FreeSites",
  description:
    "Friendship Foundation — Three design direction homepages. Choose a design direction to review.",
};

export default function FriendshipFoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="friendshipfoundation-layout">
      <main className="ff-main">{children}</main>
    </div>
  );
}
