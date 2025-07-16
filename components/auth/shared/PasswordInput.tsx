"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 disabled?: boolean;
 name?: string;
 placeholder?: string;
}

export const PasswordInput = ({
 placeholder,
 value,
 name,
 onChange,
 disabled,
}: PasswordInputProps) => {
 const [showPassword, setShowPassword] = useState(false);

 return (
  <div className="space-y-2">
   <div className="relative">
    <Input
     name={name}
     id="password"
     type={showPassword ? "text" : "password"}
     placeholder={placeholder ? placeholder : "Enter password"}
     value={value}
     onChange={onChange}
     className="h-12 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 pr-12  w-full"
     disabled={disabled}
      style={{ fontFamily: "General Sans, sans-serif", color: "#333333",fontSize:15 }}
               
    />
    <button
     style={{ fontFamily: "General Sans, sans-serif", color: "#1A1A1A",fontSize:13 }}
     type="button"
     onClick={() => setShowPassword(!showPassword)}
     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
     aria-label={showPassword ? "Hide password" : "Show password"}
     disabled={disabled}
    >
     {showPassword ? (
      <EyeOff className="h-5 w-5" />
     ) : (
      <Eye className="h-5 w-5" />
     )}
    </button>
   </div>
  </div>
 );
};
