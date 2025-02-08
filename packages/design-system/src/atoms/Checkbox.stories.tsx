import { Meta, StoryObj } from "@storybook/react/*"
import Checkbox from "./Checkbox"
import { useState } from "react"

const meta = {
  title: "Atoms/Checkbox",
  component: () => {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {
    checked: {
      control: {
        type: "boolean"
      }
    },
    onChange: {
      action: "change"
    }
  }
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {}
  }
}
