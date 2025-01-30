import { Meta, StoryObj } from "@storybook/react/*"
import LibraryList from "./LibraryList"

const meta = {
  title: "Molecules/LibraryList",
  component: LibraryList,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    title: {
      control: {
        type: "text"
      }
    },
    list: {
      control: {
        type: "object"
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof LibraryList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    list: [
      {
        title: "ASN1Decoder",
        url: "https://github.com/filom/ASN1Decoder"
      }
    ]
  }
}
