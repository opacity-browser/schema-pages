import { createContext, ReactNode, useState } from "react"

export const MenuContext = createContext<{
  addMenu?: (menu: ReactNode) => void
}>({})

export default function MenuList({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<ReactNode[]>([])

  const addMenu = (menu: ReactNode) => {
    setMenu((prevMenu) => [...prevMenu, menu])
  }

  return (
    <MenuContext value={{ addMenu }}>
      <div>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {children}
    </MenuContext>
  )
}
