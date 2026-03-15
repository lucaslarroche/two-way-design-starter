import { InputHTMLAttributes, useId } from "react"
import classNames from "classnames"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={inputId}
        className={classNames(
          "w-4 h-4 rounded-sm border border-gray-300 bg-white text-blue-600",
          "checked:bg-blue-600 checked:border-transparent",
          "hover:border-gray-400",
          "focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none",
          "cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-900 select-none cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  )
}
