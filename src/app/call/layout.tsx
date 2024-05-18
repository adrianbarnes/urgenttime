import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between bg-white p-4">
        <div className="ml-8 p-4">
          <div className="flex items-center">

            <a href="#">
              <Image src="/logo.svg" alt="Urgenttime Logo"
                className="h-8 mr-4"
                width={163}
                height={31}
              />
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Link href="#">
            <Image
              src="/avatar.svg"
              alt="User Avatar"
              className="h-8 w-8 rounded-full mr-4" 
              width={32}
              height={31}
            />
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}