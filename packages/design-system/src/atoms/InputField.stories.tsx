import { Meta, StoryObj } from "@storybook/react/*"
import InputField from "./InputField"
import Selectbox from "./Selectbox"

const meta = {
  title: "Atoms/InputField",
  component: () => {
    return (
      <InputField label="Label" description="Description">
        <Selectbox />
      </InputField>
    )
  },
  parameters: {
    layout: "centered"
  },
  argTypes: {
    label: {
      control: {
        type: "text"
      }
    },
    description: {
      control: {
        type: "text"
      }
    },
    children: {
      control: {
        type: "object"
      }
    }
  }
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
