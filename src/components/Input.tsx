import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, ...props }) => {
    return (
        <div className="flex flex-col gap-1">
            <input
                {...props}
                placeholder={placeholder}
                className={`
          w-full
          px-4 py-3
          bg-transparent
          text-lg
          text-white
          border border-[#343d47]
          rounded-[8px]
          outline-none
          placeholder:text-[#919EAB]
          transition-colors duration-200
          hover:border-[#ffffff]
          focus:border-[#ffffff]
          ${props.className ?? ""}
        `}
            />
        </div>
    );
};

export default Input;
