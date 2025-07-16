"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const menuItems = [
  { icon: "/images/icon/graph.png", label: "Dashboard", href: "/dashboard" },
  { icon: "/images/icon/book.png", label: "Billing", href: "/dashboard/billing" },
  { icon: "/images/icon/profile.png", label: "Formations", href: "/dashboard/formation" },
  { icon: "/images/icon/people.png", label: "Students", href: "/dashboard/students" },
  { icon: "/images/icon/document-text.png", label: "Enrolment", href: "/dashboard/users" },
  { icon: "/images/icon/setting-2.png", label: "Settings", href: "/dashboard/settings" },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Only mark Dashboard active on exact match
  const isActive = (href?: string) => {
    if (!href) return false;

    const base = href.replace(/\/+$/, ""); // Remove trailing slash
    const current = pathname.replace(/\/+$/, "");

    if (base === "/dashboard") {
      return current === base; // Exact match only
    }

    return current === base || current.startsWith(base + "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-80 rounded-2xl sticky top-0 h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        <Image
          src="/images/educate-logo.svg"
          alt="Logo"
          width={180}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Menu */}
      <nav
        style={{
          fontFamily: "General Sans, sans-serif",
          color: "#6A6C80",
          fontSize: 14,
          fontWeight: 500,
        }}
        className="p-4 space-y-3 flex-grow overflow-auto"
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={isActive(item.href)}
          />
        ))}
      </nav>

      {/* Logout Button */}
   <div className="p-4">
  <Button
    onClick={handleLogout}
    className="bg-blue-950 group hover:bg-blue-900 text-white flex items-center justify-center rounded-full mx-auto space-x-2 py-3 px-4 w-40"
  >
    <LogOut className="w-2 h-4 group-hover:-ms-2 transition-all duration-500 rotate-180" />
    <span
      style={{
        fontFamily: "General Sans, sans-serif",
        color: "#fff",
        fontSize: 10,
        fontWeight: 500,
      }}
      className="font-medium"
    >
      LOGOUT
    </span>
  </Button>
</div>

    </aside>
  );
};

type MenuItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
};

const MenuItem = ({
  icon,
  label,
  active = false,
  href = "#",
}: MenuItemProps) => {
  const content = (
    <div
      className={`flex items-center space-x-3 px-6 py-6 rounded-lg cursor-pointer transition-all duration-300 ${
        active
          ? "bg-[#eeffe0] text-green-700 font-bold"
          : "text-[#6A6C80] hover:bg-gray-100"
      }`}
    >
      <Image
        src={icon}
        alt={label}
        width={20}
        height={20}
        className="object-contain"
      />
      <span
        className={`text-sm ${
          active ? "text-green-700 font-bold" : "text-[#6A6C80]"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    <button className="w-full text-left">{content}</button>
  );
};
