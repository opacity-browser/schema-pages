import { Meta, StoryObj } from "@storybook/react/*"
import HistoryList from "./HistoryList"

const meta = {
  title: "Molecules/HistoryList",
  component: HistoryList,
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
    },
    onDelete: {
      action: "delete"
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof HistoryList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "2025-03",
    list: [
      {
        id: "a",
        title:
          "Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity",
        url: "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
        createDate: "2024-03-01 12:00:00"
      },
      {
        id: "b",
        title: "Opacity",
        url: "https://opacity.dev",
        createDate: "2024-03-01 12:00:00"
      },
      {
        id: "c",
        title: "Opacity2",
        url: "https://opacity.dev",
        createDate: "2024-03-02 12:00:00"
      },
      {
        id: "d",
        title: "Opacity3",
        url: "https://opacity.dev",
        createDate: "2024-03-02 12:00:00"
      }
    ],
    onDelete: () => {}
  }
}
