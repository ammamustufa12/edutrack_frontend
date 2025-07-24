"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Settings, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("User ID not found in localStorage");
      return;
    }

    fetch(`https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("User fetched in Header:", data);

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          console.warn("Failed to load user info");
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);
  function capitalizeFirstWord(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  return (
    <header className="bg-white border-b px-6 rounded-2xl sticky top-0 z-40">
      <div className="flex justify-between items-center">
        {/* Dashboard Title with Role */}
       <h3
  className="text-xl font-bold text-gray-600 flex items-center gap-2"
  style={{
    fontFamily: "General Sans, sans-serif",
    fontSize: 15,
    fontWeight: 600,
  }}
>
   {user?.role ? `Dashboard. ${capitalizeFirstWord(user.role)} Access` : "Dashboard"}
</h3>


        {/* User info display */}
        {/* <div className="text-sm text-gray-500 hidden md:block">
          {user ? (
            <>
              Logged in as <strong>{user.name}</strong> ({user.role})
            </>
          ) : (
            "Loading user..."
          )}
        </div> */}

        {/* Right section: Search, Notifications, Messages, Settings, Avatar */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-72 h-10 text-sm bg-gray-50 border-none rounded-2xl focus:border-blue-500 focus:ring-blue-500"
              style={{
                fontFamily: "General Sans, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#000",
              }}
            />
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative outline-none rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <Bell className="text-gray-600 h-5 w-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 !rounded-2xl">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                New student enrolled in Mathematics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages Dropdown */}
       <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="relative outline-none rounded-full bg-gray-50 hover:bg-gray-100"
    >
      <Image
        src="/images/icon/messages-2.png"
        alt="Messages"
        width={22} // smaller size
        height={22}
        className="object-contain"
      />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-80 !rounded-2xl">
    <DropdownMenuLabel>Messages</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>New message from John</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full outline-none bg-gray-50 hover:bg-gray-100"
              >
                <Settings className="text-gray-600 h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 !rounded-2xl">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 ring-2 ring-green-500 cursor-pointer hover:ring-blue-300 transition-all">
                <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" />
                <AvatarFallback className="bg-orange-500 text-white font-medium">
                  {user?.name?.slice(0, 2).toUpperCase() ?? "SA"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 !rounded-2xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
