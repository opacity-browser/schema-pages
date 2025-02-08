import { Meta, StoryObj } from "@storybook/react/*"
import InputField from "./InputField"
import Listbox from "./Listbox"

const meta = {
  title: "Atoms/InputField",
  component: () => {
    return (
      <InputField label="Label" description="Description">
        <Listbox
          list={[
            {
              id: "1",
              name: "Option 1"
            },
            {
              id: "2",
              name: "Option 2"
            },
            {
              id: "3",
              name: "Option 3"
            }
          ]}
          selected={{
            id: "1",
            name: "Option 1"
          }}
          onChange={() => {}}
        />
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
