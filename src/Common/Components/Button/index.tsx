import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-200 ease-linear";
  const variantStyles = {
    solid:
      "bg-custom-500 text-white hover:bg-custom-600 focus:bg-custom-600 active:bg-custom-600",
    outline:
      "border border-custom-500 text-custom-500 hover:bg-custom-50 focus:bg-custom-50 active:bg-custom-50",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
