"use client";

interface ToggleCheckboxProps {
 id: string;
 checked: boolean;
 onChange: (checked: boolean) => void;
 label: string;
}

export const ToggleCheckbox = ({
 id,
 checked,
 onChange,
 label,
}: ToggleCheckboxProps) => {
 return (
  <div className="flex items-center space-x-3">
   <label htmlFor={id} className="flex items-center cursor-pointer">
    <div className="relative">
     <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
     />
     <div
      className={`w-10 h-5 rounded-full transition-colors ${
       checked ? "bg-green-600" : "bg-gray-300"
      }`}
     ></div>
     <div
      className={`dot absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-transform ${
       checked ? "translate-x-5" : ""
      }`}
     ></div>
    </div>
    <span className="ml-3 text-sm text-gray-600">{label}</span>
   </label>
  </div>
 );
};
