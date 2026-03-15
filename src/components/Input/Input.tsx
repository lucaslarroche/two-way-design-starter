import { InputHTMLAttributes, useId } from "react"
import classNames from "classnames"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classNames(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
          "placeholder:text-gray-400",
          "hover:border-gray-400",
          "focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  )
}
