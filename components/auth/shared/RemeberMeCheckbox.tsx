"use client";

interface RememberMeCheckboxProps {
 checked: boolean;
 onChange: (checked: boolean) => void;
 disabled?: boolean;
}

export const RememberMeCheckbox = ({
 checked,
 onChange,
 disabled,
}: RememberMeCheckboxProps) => {
 return (
  <label
   htmlFor="remember"
   className="flex items-center cursor-pointer select-none"
  >
   <div className="relative">
    <input
     id="remember"
     type="checkbox"
     checked={checked}
     onChange={(e) => onChange(e.target.checked)}
     className="sr-only"
     disabled={disabled}
    />
    <div
     className={`w-10 h-5 rounded-full transition-colors ${
      checked ? "bg-green-600" : "bg-gray-300"
     } ${disabled ? "opacity-50" : ""}`}
    ></div>
    <div
     className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${
      checked ? "translate-x-5" : ""
     } ${disabled ? "opacity-50" : ""}`}
    ></div>
   </div>
   <span
      
     style={{ fontFamily: "General Sans, sans-serif", color: "#1A1A1A",fontSize:13 }}
    className={`ml-3 text-sm text-gray-600 ${disabled ? "opacity-50" : ""}`}
   >
    Remember me
   </span>
  </label>
 );
};
