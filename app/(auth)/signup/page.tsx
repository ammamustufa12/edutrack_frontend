import { SignupForm } from "@/components/auth/signup/SignupForm";
import { SignupImage } from "@/components/auth/signup/SignupImage";

export default function SignupPage() {
 return (
  <div className="min-h-screen flex flex-col-reverse md:flex-row">
   {/* Signup Form */}
   <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 order-1 md:order-2">
    <SignupForm />
   </div>

   {/* Background Image */}
   <SignupImage />
  </div>
 );
}
