import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../components/userAvatar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between bg-white p-4">
        <div className="container mx-auto md:py-4">
        <div className="flex w-full">
          <div className="flex items-center mr-auto">

            <a href="#">
              <Image src="/logo.svg" alt="Urgenttime Logo"
                className="h-8 mr-4"
                width={163}
                height={31}
              />
            </a>
          </div>

        <UserAvatar/>
        </div>
        </div>
      </nav>
      {children}
    </div>
  );
}