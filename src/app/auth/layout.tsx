import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between p-4 bg-gray-200">
        <div className="flex items-center">

          <a href="#">
            <Image src="/logo.svg" alt="Urgenttime Logo"
              className="h-8 mr-4"
              width={163}
              height={31}
            />
          </a>
        </div>
        {/* <div className="flex items-center">
        <a>
          <img src="/avatar.png" alt="User Avatar" className="h-8 w-8 rounded-full" />
        </a>
    </div> */}
      </nav>
      <div>{children}</div>
    </div>
  );
}