import { Meta, StoryObj } from "@storybook/react/*"
import ErrorMessage from "./ErrorMessage"

const meta = {
  title: "Atoms/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    title: {
      control: {
        type: "text"
      }
    },
    message: {
      control: {
        type: "text"
      }
    },
    onClick: {
      action: "refresh"
    }
  }
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Unknown error",
    message: "An unknown error occurred.",
    btnText: "Refresh",
    onClick: () => {}
  }
}
