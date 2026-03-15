import { ButtonHTMLAttributes } from "react"
import classNames from "classnames"

export type ButtonVariant =
  | "default"
  | "secondary"
  | "tertiary"
  | "success"
  | "danger"
  | "warning"
  | "dark"
  | "ghost"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ variant = "default", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "default" &&
          "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
        variant === "secondary" &&
          "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100",
        variant === "tertiary" &&
          "text-blue-700 bg-transparent hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100",
        variant === "success" &&
          "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300",
        variant === "danger" &&
          "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300",
        variant === "warning" &&
          "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300",
        variant === "dark" &&
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300",
        variant === "ghost" &&
          "text-gray-900 bg-transparent border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
