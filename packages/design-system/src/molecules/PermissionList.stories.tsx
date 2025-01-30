import { Meta, StoryObj } from "@storybook/react/*"
import PermissionList from "./PermissionList"

const meta = {
  title: "Molecules/PermissionList",
  component: PermissionList,
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
} satisfies Meta<typeof PermissionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Notification",
    list: [
      {
        id: "a",
        domain:
          "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
        permission: 2,
        isDenied: false,
        createDate: "2024-03-01 12:00:00"
      },
      {
        id: "b",
        domain:
          "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
        permission: 2,
        isDenied: true,
        createDate: "2024-03-02 12:00:00"
      }
    ],
    onDelete: () => {}
  }
}
