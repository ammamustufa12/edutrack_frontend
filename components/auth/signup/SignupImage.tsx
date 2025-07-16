import Image from "next/image";

export const SignupImage = () => {
 return (
  <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto">
   <Image
    src="/images/banner.png"
    alt="Signup Illustration"
    fill
    className="object-cover"
    priority
   />
  </div>
 );
};
