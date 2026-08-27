import type { Metadata } from "next";
import "./friendshipfoundation.css";

export const metadata: Metadata = {
  title: "Friendship Foundation | FreeSites",
  description: "Friendship Foundation's custom website, built by FreeSites.",
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
