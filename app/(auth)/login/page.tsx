import { LoginForm } from "@/components/auth/login/LoginForm";
import { LoginImage } from "@/components/auth/login/LoginImage";

export default function LoginPage() {
 return (
  <div className="min-h-screen flex flex-col-reverse md:flex-row">
   {/* Left side - Login Form */}
   <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 order-1 md:order-2">
    <LoginForm />
   </div>

   {/* Right side - Background Image */}
   <LoginImage />
  </div>
 );
}
