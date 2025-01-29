import { Meta, StoryObj } from "@storybook/react/*"
import Selectbox from "./Selectbox"

const meta = {
  title: "Atoms/Selectbox",
  component: Selectbox,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    className: {}
  }
} satisfies Meta<typeof Selectbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
