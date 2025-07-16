import { ForgotPasswordForm } from "@/components/auth/forgot-password/ForgotPasswordForm";
import { ForgotPasswordImage } from "@/components/auth/forgot-password/ForgotPasswordImage";

export default function ForgotPasswordPage() {
 return (
  <div className="min-h-screen flex flex-col-reverse md:flex-row">
   {/* Form Section */}
   <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 md:py-0 order-1 md:order-2">
    <ForgotPasswordForm />
   </div>

   {/* Image Section */}
   <ForgotPasswordImage />
  </div>
 );
}
