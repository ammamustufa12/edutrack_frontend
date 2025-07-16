"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCardProps } from "@/types/dashboard";
import Image from "next/image";

const statsData: StatsCardProps[] = [
{
  title: "Total Students",
  value: "3,200",
  icon: "users",
  progress: 100,
  description: "All enrolled students",

  // ✅ Custom gradient approximation
  gradientFrom: "from-[#7F7DFF]",
  gradientTo: "to-[#ADABFF]",

  decorationFrom: "from-[#edeaff]",
  decorationTo: "to-[#fafaff]",

  progressColor: "bg-[#a18aff]", // optional: match the purple accent
  textColor: "text-[#4b4b6b]", // subtle blue/gray
},
{
  title: "Paid Students",
  value: "2,450",
  icon: "material-symbols_paid-outline",
  progress: 76.5,
  description: "76.5% of total students",

  gradientFrom: "from-[#B6FFCF]",     // keep vibrant gradient
  gradientTo: "to-[#00EA4E]",

  // ✅ Softer green for decoration background
  decorationFrom: "from-[#E2FFF0]",   // very light mint green
  decorationTo: "to-[#CCFFE1]",       // soft pastel green

  progressColor: "bg-[#00EA4E]",
  textColor: "text-[#00B946]",
}

,
 {
  title: "Unpaid Students",
  value: "750",
  icon: "wallet-remove",
  progress: 23.5,
  description: "23.5% pending payment",

  // ✅ Custom gradient approximation using hex colors
  gradientFrom: "from-[#FFAC78]",
  gradientTo: "to-[#FF7040]",

  // Optional decoration/background tones
  decorationFrom: "from-[#ffe0d1]",
  decorationTo: "to-[#ffd3c0]",

  // Progress bar & text
  progressColor: "bg-[#FF7040]",
  textColor: "text-[#D65123]",
}

];

export const StatsCards = () => {
 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   {statsData.map((stat, index) => (
    <StatsCard key={index} {...stat} />
   ))}
  </div>
 );
};

const StatsCard = ({
 title,
 value,
 icon,
 progress,
 description,
 gradientFrom,
 gradientTo,
 decorationFrom,
 decorationTo,
 progressColor,
 textColor,
}: StatsCardProps) => {
 return (
  <Card className="bg-white border-none min-h-[198px] flex flex-col justify-between shadow-none relative rounded-2xl h-full p-0">
   {/* Corner decoration */}
   <div
    className={`absolute top-0 left-0 w-40 h-20 opacity-60 rounded-t-2xl bg-gradient-to-br ${decorationFrom} ${decorationTo} rounded-br-2xl -z-1 blur-sm`}
   ></div>

   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
    <div className="space-y-2">
     <CardTitle
      className={`text-base font-medium text-${textColor}-600`}
      style={{ fontFamily: "General Sans,color:#313562 ,sans-serif",fontSize:16,fontWeight:500 }}
     >
      {title}
     </CardTitle>
     <div
         style={{ fontFamily: "General Sans, sans-serif",fontSize:30,fontWeight:600 }}
      className="text-3xl font-bold text-gray-900 mb-2"
     >
      {value}
     </div>
    </div>

    <div
     className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl flex items-center justify-center shadow-md`}
    >
     <Image src={`/images/${icon}.svg`} alt="icon" width={32} height={24} 
     
     />
    </div>
   </CardHeader>

   <CardContent className="pt-0">
    {/* Progress Bar */}
    <div className={`w-full bg-gray-100 rounded-full h-2 mb-2`}>
     <div
      className={`h-2 rounded-full  ${progressColor}`}
      style={{ width: `${progress}%` }}
     ></div>
    </div>

    <p
       style={{ fontFamily: "General Sans, sans-serif",fontSize:16,fontWeight:500,color:'#6A6C80' }}
     className="text-sm md:text-base text-gray-400"
    >
     {description}
    </p>
   </CardContent>
  </Card>
 );
};
