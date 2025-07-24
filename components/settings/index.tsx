"use client";

import { useEffect, useState } from "react";
import {
  SettingsIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  ShieldIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Settings = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
      fetchUserData(storedId);
    }
  }, []);

  const fetchUserData = async (id: string) => {
    try {
      const res = await axios.get(
        `https://edu-track-4h4z.onrender.com/api/v1/auth/me?id=${id}`
      );
      const user = res.data.user;
      const [firstName, ...lastParts] = user.name?.split(" ") || ["", ""];
      setForm({
        firstName,
        lastName: lastParts.join(" "),
        email: user.email || "",
        password: "",
      });
      setRole(user.role || "user");
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      const payload = {
        name: fullName,
        email: form.email,
      };

      await axios.put(
        `https://edu-track-4h4z.onrender.com/api/v1/auth/${userId}`,
        payload
      );

      if (form.password) {
        await axios.post(
          `https://edu-track-4h4z.onrender.com/api/v1/auth/reset-password/${userId}`,
          {
            password: form.password,
          }
        );
      }

      alert("User updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 space-y-6 mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
        <SettingsIcon className="w-7 h-7 text-primary" />
        Account Settings
      </h1>

      <Card className="shadow-md border rounded-2xl">
        <CardContent className="py-8 px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="pl-10 font-semibold"
                />
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="pl-10 font-semibold"
                />
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="pl-10 font-semibold"
                />
                <MailIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Role (non-editable) */}
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="relative">
                <Input
                  value={role}
                  disabled
                  className="pl-10 font-semibold bg-gray-100 cursor-not-allowed"
                />
                <ShieldIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Password */}
            {/* <div className="space-y-2 md:col-span-2">
              <Label htmlFor="password">
                Password (Leave blank to keep current)
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="text" // <-- display plain text password
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="pl-10"
                />
                <LockIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div> */}
          </div>

          <div className="flex justify-end pt-4">
            <Button className="px-6" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
