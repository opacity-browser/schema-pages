import { Meta, StoryObj } from "@storybook/react/*"
import Logo from "./Logo"

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    className: {
      control: {
        type: "text"
      }
    }
  }
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: "size-12"
  },
  parameters: {
    backgrounds: {
      default: "bg",
      values: [{ name: "bg", value: "#222" }]
    }
  }
}

export const Invert: Story = {
  args: {
    className: "invert size-12"
  }
}
