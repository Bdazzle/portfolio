import { useEffect, useState } from "react"

interface Burger {
  barColor: string,
  containerstyle: string,
  onClick: () => void,
  defaultClickState: boolean,
}

const BurgerMenu: React.FC<Burger> = ({ barColor, containerstyle, onClick, defaultClickState }) => {
  const [isClicked, setIsClicked] = useState<boolean>()
  const [barStyle, setBarStyle] = useState<string>()

  const handleClick = (): void => {
    onClick()
  }

  useEffect(() => {
    setIsClicked(defaultClickState)
  })

  useEffect(() => {
    const barClass = `mr-[6px] mb-[4px] w-[30px] h-[4px]`
    setBarStyle(barClass)
  }, [barColor])

  return (
    <div id="menu"
      className={containerstyle}
      onClick={() => handleClick()}>
      <div id="bar1"
      style={{
        backgroundColor: barColor
      }}
        className={`${isClicked ? `rotate-45 translate-y-[10px]  transition-all duration-500 ease-in-out` : ``} ${barStyle}`}
      ></div>
      <div id="bar2"
      style={{
        backgroundColor: barColor
      }}
        className={`${isClicked ? `transition-opacity duration-300 opacity-0` : ``} ${barStyle}`}
      ></div>
      <div id="bar3"
      style={{
        backgroundColor: barColor
      }}
        className={`${isClicked ? `transition-all duration-500 ease-in-out -rotate-45 -translate-y-[5px] ` : ``}  ${barStyle}`}
      ></div>
    </div>
  )
}

export default BurgerMenu