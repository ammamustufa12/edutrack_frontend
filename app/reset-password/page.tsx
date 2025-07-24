"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";
import { ResetPasswordImage } from "@/components/auth/reset-password/ResetPasswordImage";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Invalid or missing reset token.</p>
      </div>
    );
  }

  return (
    // <div className="min-h-screen flex flex-col-reverse md:flex-row">
    //   {/* Left side - Form */}
    //   <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 order-1 md:order-2">
    //     <ResetPasswordForm token={token} />
    //   </div>

    //   {/* Right side - Image */}
    //   <ResetPasswordImage />
    // </div>

     <div className="min-h-screen flex flex-col-reverse md:flex-row">
       {/* Left side - Login Form */}
       <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 order-1 md:order-2">
           <ResetPasswordForm token={token} />
       </div>
    
       {/* Right side - Background Image */}
        <ResetPasswordImage />
      </div>
  );
}
