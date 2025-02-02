import { Meta, StoryObj } from "@storybook/react/*"
import ShortCutList from "./ShortCutList"

const meta = {
  title: "Molecules/ShortCutList",
  component: ShortCutList,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    list: {
      control: {
        type: "object"
      }
    }
  }
} satisfies Meta<typeof ShortCutList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    list: [
      {
        id: "11",
        title: "opacityopacityopacity",
        address: "https://opacity.dev"
      },
      {
        id: "22",
        title: "falsy",
        address: "https://falsy.me"
      },
      {
        id: "33",
        title: "falsy",
        address: "https://falsy.me"
      }
    ]
  }
}
