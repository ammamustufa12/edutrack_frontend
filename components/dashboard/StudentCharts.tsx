"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ChartData } from "@/types/dashboard";
import React from "react";

const chartData: ChartData[] = [
 { month: "Jan", students: 45, label: "Jan - 55 Students" },
 { month: "Feb", students: 52, label: "Feb" },
 { month: "Mar", students: 78, label: "Mar - 70 Students" },
 { month: "Apr", students: 65, label: "Apr - 60 Students" },
 { month: "May", students: 45, label: "May" },
 { month: "Jun", students: 58, label: "Jun" },
 { month: "Jul", students: 72, label: "Jul" },
 { month: "Aug", students: 110, label: "Aug - 110 Students" },
 { month: "Sep", students: 95, label: "Sep" },
 { month: "Oct", students: 88, label: "Oct" },
 { month: "Nov", students: 92, label: "Nov" },
 { month: "Dec", students: 85, label: "Dec" },
];

export const StudentChart = () => {
 const maxStudents = Math.max(...chartData.map((d) => d.students));
 const timePeriods = ["Weekly", "Monthly", "Yearly"];
 const [selectedPeriod, setSelectedPeriod] = React.useState("Yearly");

 return (
  <Card className="shadow-none border-none rounded-2xl">
   <CardHeader>
    <div className="flex items-center justify-between">
     <CardTitle className="text-lg font-normal text-gray-900">
      Number Of Students and Review
     </CardTitle>
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button
        variant="outline"
        size="sm"
        className="text-gray-600 flex items-center gap-2"
       >
        {selectedPeriod}
        <ChevronDown className="h-4 w-4 opacity-50" />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 !rounded-2xl">
       {timePeriods.map((period) => (
        <DropdownMenuItem
         key={period}
         onClick={() => setSelectedPeriod(period)}
         className={selectedPeriod === period ? "bg-gray-100" : ""}
        >
         {period}
        </DropdownMenuItem>
       ))}
      </DropdownMenuContent>
     </DropdownMenu>
    </div>
   </CardHeader>
   <CardContent>
    <div className="h-80 relative">
     {/* Y-Axis Labels */}
     <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
      {[140, 120, 100, 80, 60, 40, 20, 0].map((val, i) => (
       <span key={i}>{val}</span>
      ))}
     </div>

     {/* Grid Lines */}
     <div className="absolute inset-0 ml-8 flex flex-col justify-between">
      {[...Array(8)].map((_, i) => (
       <div key={i} className="border-t border-gray-100"></div>
      ))}
     </div>

     {/* Chart Line */}
     <svg className="absolute inset-0 w-full h-full ml-8" viewBox="0 0 800 300">
      <defs>
       <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
       </linearGradient>
      </defs>

      <path
       d={`M 0 ${300 - (chartData[0].students / maxStudents) * 250} ${chartData
        .map(
         (point, index) =>
          `L ${(index * 800) / (chartData.length - 1)} ${
           300 - (point.students / maxStudents) * 250
          }`
        )
        .join(" ")} L 800 300 L 0 300 Z`}
       fill="url(#chartGradient)"
      />
      <path
       d={`M 0 ${300 - (chartData[0].students / maxStudents) * 250} ${chartData
        .map(
         (point, index) =>
          `L ${(index * 800) / (chartData.length - 1)} ${
           300 - (point.students / maxStudents) * 250
          }`
        )
        .join(" ")}`}
       stroke="#10b981"
       strokeWidth="3"
       fill="none"
      />
      {chartData.map((point, index) => (
       <circle
        key={index}
        cx={(index * 800) / (chartData.length - 1)}
        cy={300 - (point.students / maxStudents) * 250}
        r="4"
        fill="#10b981"
        stroke="white"
        strokeWidth="2"
       />
      ))}
     </svg>

     {/* Labels */}
     {chartData.map((point, index) =>
      point.label.includes(" - ") ? (
       <div
        key={index}
        className="absolute text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm border transform -translate-x-1/2 -translate-y-8"
        style={{
         left: `${(index * 100) / (chartData.length - 1)}%`,
         top: `${100 - (point.students / maxStudents) * 80}%`,
        }}
       >
        {point.label}
       </div>
      ) : null
     )}

     {/* X-Axis */}
     <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 pt-2">
      {chartData.map((point, i) => (
       <span key={i}>{point.month}</span>
      ))}
     </div>
    </div>
   </CardContent>
  </Card>
 );
};
