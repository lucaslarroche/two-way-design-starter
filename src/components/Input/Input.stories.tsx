import type { Meta, StoryObj } from "@storybook/nextjs"
import { Input } from "./Input"

const meta = {
  title: "Design System/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Optional label displayed above the input",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
  args: {
    placeholder: "Enter a value...",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "name@company.com",
    type: "email",
  },
}

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "••••••••",
    type: "password",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled input",
    placeholder: "Cannot edit this",
    disabled: true,
  },
}
