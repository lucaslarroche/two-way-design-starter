import type { Meta, StoryObj } from "@storybook/nextjs"
import { Checkbox } from "./Checkbox"

const meta = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Optional label displayed next to the checkbox",
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: "I agree with the terms and conditions",
  },
}

export const Checked: Story = {
  args: {
    label: "Accepted",
    checked: true,
    readOnly: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    checked: true,
    readOnly: true,
  },
}
