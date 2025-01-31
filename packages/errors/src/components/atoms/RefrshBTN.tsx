export default function RefrshBTN({
  text,
  onClick
}: {
  text: string
  onClick: () => void
}) {
  return <button onClick={onClick}>{text}</button>
}
