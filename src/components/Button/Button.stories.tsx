import type { Meta, StoryObj } from "@storybook/nextjs"
import { Button, type ButtonVariant } from "./Button"

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "tertiary",
        "success",
        "danger",
        "warning",
        "dark",
        "ghost",
      ] satisfies ButtonVariant[],
      description: "Visual style of the button",
    },
    children: {
      control: "text",
      description: "Button label",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Button",
    variant: "default",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }
export const Tertiary: Story = { args: { variant: "tertiary" } }
export const Success: Story = { args: { variant: "success" } }
export const Danger: Story = { args: { variant: "danger" } }
export const Warning: Story = { args: { variant: "warning" } }
export const Dark: Story = { args: { variant: "dark" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Disabled: Story = { args: { disabled: true } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      {(
        [
          "default",
          "secondary",
          "tertiary",
          "success",
          "danger",
          "warning",
          "dark",
          "ghost",
        ] as ButtonVariant[]
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
}
