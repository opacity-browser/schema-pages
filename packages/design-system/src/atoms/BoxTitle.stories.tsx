import { Meta, StoryObj } from "@storybook/react/*"
import BoxTitle from "./BoxTitle"

const meta = {
  title: "Atoms/BoxTitle",
  component: BoxTitle,
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  args: {
    children: "Box Title"
  }
} satisfies Meta<typeof BoxTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
