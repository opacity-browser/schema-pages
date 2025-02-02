import { Meta, StoryObj } from "@storybook/react/*"
import CheckboxField from "./CheckboxField"
import { useState } from "react"
import Checkbox from "./Checkbox"

const meta = {
  title: "Atoms/CheckboxField",
  component: () => {
    const [checked, setChecked] = useState(false)
    return (
      <CheckboxField
        label="Label"
        description="Description"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    )
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {}
  // args: {
  //   children: "CheckboxField"
  // }
} satisfies Meta<typeof CheckboxField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {}
  }
}
