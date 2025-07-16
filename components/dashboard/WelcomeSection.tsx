"use client";
import React from "react";

const WelcomeSection = () => {
  return (
    <div
      className="w-full rounded-2xl bg-[url('/images/background-color.png')] bg-cover bg-center bg-no-repeat py-10 md:py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl  backdrop-blur-md p-6 rounded-xl">
        <h1
          className="text-5xl md:text-4xl font-medium text-gray-800 mb-6"
              style={{ fontFamily: "General Sans, sans-serif", color: "#000",fontSize:40,fontWeight: 400 }}
        >
          Welcome To Edu Track
        </h1>
{/* need to change font out fit */}
        <p
          className="text-md md:text-base text-green-600 leading-relaxed max-w-3xl"
                style={{ fontFamily: "General Sans, sans-serif", color: "#2B512CD1",fontSize:16,fontWeight: 400 }}

        >
          It is a long established fact that a reader will be distracted by the
          readable <br></br> content of a page when looking at its layout.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
