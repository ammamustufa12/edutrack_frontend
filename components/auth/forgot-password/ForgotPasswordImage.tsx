import Image from "next/image";

export const ForgotPasswordImage = () => {
 return (
  <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto">
   <Image
    src="/images/banner.png"
    alt="Forgot Password Illustration"
    fill
    className="object-cover"
    priority
   />
  </div>
 );
};
