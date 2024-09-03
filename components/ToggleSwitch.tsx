import { ReactNode, useEffect, useState } from "react";

interface IconProps {
  [key: string]: {
    fillcolor: string,
    // path: React.SVGProps<SVGPathElement | SVGGElement>
    path: ReactNode
  }
}

interface Toggle {
  toggleFunction: (themeName: string) => void;
  switchColor: string;
  backgroundColor: string;
  icons: IconProps
}

/*
pos references Object.keys(icons).length, which doesn't measure indexes,
referencing icons in render will be pos-1 (keys length to index)
math for n amount of icons/themes = pos > 1 ? (100/totalPositions) * pos : 0
*/
const ToggleSwitch: React.FC<Toggle> = ({ toggleFunction, switchColor, backgroundColor, icons }) => {
  const [pos, setPos] = useState<number>(0)
  const [scheme, setScheme] = useState<string>()
  const totalPositions = Object.keys(icons).length

  const handleToggle = (): void => {
    if (pos + 1 > totalPositions) {
      setPos(1)
      toggleFunction(Object.keys(icons)[0])
      setScheme(Object.keys(icons)[0])
    } else {
      setPos(pos + 1)
      toggleFunction(Object.keys(icons)[pos])
      setScheme(Object.keys(icons)[pos])
    }
  }

  /*
  sets initial toggle position and scheme,
  1 = light, 2 = dark, etc..
  */
  useEffect(() => {
    setPos(2)
  }, [])

  return (
    <div id="toggle_container"
      className={`mt-[5px] h-3 rounded-lg mr-[3vw]`}
      style={{
        width: totalPositions * 20,
        backgroundColor: backgroundColor,
      }}
      onClick={() => handleToggle()}
    >
      <div id="toggle_switch"
        className={`rounded-[50%] -top-1 h-5 w-5 relative block right-6 tranistion-[left] duration-500 ease-in-out`}
        style={{
          backgroundColor: switchColor,
          left: `${pos > 1 ? ((100 / totalPositions) * pos) - 40 : 0}%`,
        }}
      >
        <svg
          fill={!scheme ? icons['dark'].fillcolor : icons[scheme as string].fillcolor}
          viewBox="-20 -20 130 130" height="20" width="20">
          {
            !scheme ? icons['dark'].path : icons[scheme as string].path
          }
        </svg>
      </div>
    </div>
  )
}

export default ToggleSwitch