"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Checkbox } from "@/components/Checkbox"

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Demo page — two-way-design-starter</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Your email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
          />

          <Input
            label="Your password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <Checkbox label="I agree with the terms and conditions" />

          <Button type="submit" className="w-full justify-center">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}
