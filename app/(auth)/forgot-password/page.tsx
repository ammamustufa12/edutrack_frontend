// "use client";

// import React from "react";
// import { ForgotPasswordForm } from "@/components/auth/forgot-password/ForgotPasswordForm";
// import { ForgotPasswordImage } from "@/components/auth/forgot-password/ForgotPasswordImage";

// export default function ForgotPasswordPage() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Left image half */}
//       <div className=" md:block w-1/2">
//         <ForgotPasswordImage />
//       </div>

//       {/* Right form half */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
//         <ForgotPasswordForm />
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password/ForgotPasswordForm";
import { ForgotPasswordImage } from "@/components/auth/forgot-password/ForgotPasswordImage";

export default function ForgotPasswordPage() {
  return (
  <div className="min-h-screen flex flex-col-reverse md:flex-row">
   {/* Left side - Login Form */}
   <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 order-1 md:order-2">
       <ForgotPasswordForm />
   </div>

   {/* Right side - Background Image */}
      <ForgotPasswordImage />
  </div>
   );
 }