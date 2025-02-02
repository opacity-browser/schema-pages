import { Meta, StoryObj } from "@storybook/react/*"
import Button from "./Button"

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"]
      }
    }
  },
  args: {
    children: "Button"
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}

export const Small: Story = {
  args: {
    size: "small"
  }
}

export const Medium: Story = {
  args: {
    size: "medium"
  }
}

export const Large: Story = {
  args: {
    size: "large"
  }
}
