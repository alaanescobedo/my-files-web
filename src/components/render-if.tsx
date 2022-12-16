interface RenderIfProps {
  children: JSX.Element | JSX.Element[]
  condition: boolean
  fallback?: JSX.Element
}
export const RenderIf = ({ children, condition, fallback }: RenderIfProps) => {
  const Default = fallback || null
  if (condition === false) return Default

  if (Array.isArray(children)) return <>{children}</>

  return <>{children}</>
}