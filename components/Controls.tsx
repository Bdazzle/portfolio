import { useContext, useState } from "react"
import { IconedButton } from "./IconedButton"
import { PortfolioContext } from "../context/PortfolioContext"
import { useDebouncedCallback } from "use-debounce"

const Controls: React.FC = () => {
  const [showControls, setShowControls] = useState<boolean>(false)
  const { currentTheme, setpDensity, animationState, setAnimationState, setpSize } = useContext(PortfolioContext)

  const handlePDesnityChange = (e: React.ChangeEvent): void => {
    if (Number((e.target as HTMLInputElement).value)) setpDensity(Number((e.target as HTMLInputElement).value))
  }

  const handleSizeChange = useDebouncedCallback((val: number) => setpSize(val), 200)

  return (
    <div id="controls_container"
      className="flex flex-col right-0 w-[34px] bottom-[10px] fixed z-[4]">
      <div id="controls_inputs"
        className={`${showControls ? `animate-fadein` : `animate-fadeout`} flex flex-col items-center bg-rose mr-0 h-64 rounded-tl rounded-bl`}
      >
        <IconedButton
          twcontainerStyle={`right-0 bg-rose w-[34] z-[301] text-center rounded-t`}
          path={animationState === 'running' ?
            "M148.5,0C66.486,0,0,66.486,0,148.5S66.486,297,148.5,297S297,230.514,297,148.5S230.514,0,148.5,0z M213.292,190.121  c0,12.912-10.467,23.379-23.378,23.379H106.67c-12.911,0-23.378-10.467-23.378-23.379v-83.242c0-12.912,10.467-23.379,23.378-23.379  h83.244c12.911,0,23.378,10.467,23.378,23.379V190.121z"
            : "M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"
          }
          viewBox={animationState === 'running' ? "0 0 297 297" : "0 0 410 410"}
          svgDimensions={{
            width: 22,
            height: 22
          }}
          text={animationState === 'running' ? 'On' : 'Off'}
          fillColor={currentTheme.color}
          onClick={(): void => {
            animationState === 'running' ? setAnimationState('paused')
              : setAnimationState('running')
          }}
        />
        <label htmlFor="particle_density" className="text-center" >#</label>
        <input type="text" inputMode='numeric' id="particle_density"
          defaultValue={35}
          className='w-[70%] inline text-black text-center'
          onChange={(e) => handlePDesnityChange(e)}
        />
        <label htmlFor="particle_size" className="text-center">S</label>
        <input id="particle_size" type="range" min="0" max="100"
          className="min-h-[93px] max-h-[12vh] md:max-h-[8vh]"
          style={{
            WebkitAppearance: `slider-vertical`,
            MozOrient: "vertical"
          }}
          onInput={(e) => handleSizeChange(Number((e.target as HTMLInputElement).value))}
        />
      </div>
      <IconedButton
        id="controller"
        twcontainerStyle="absolute r-0 bottom-0 bg-rose w-[34px] z-[301] rotate-180 rounded-tr rounded-br"
        path={`M2485 8180 c-120 -14 -268 -39 -385 -66 -250 -58 -381 -122 -495 -242 -83 -88 -184 -343 -245 -622 -17 -79 -32 -146 -34 -147 -1 -1 -54 -40 -118 -85 -319 -228 -554 -446 -654 -608 -104 -170 -194 -394 -274 -686 -59 -216 -57 -203 -159 -1329 -93 -1019 -115 -1426 -116 -2130 0 -546 12 -879 40 -1106 35 -278 134 -493 312 -680 234 -245 476 -384 786 -451 144 -31 415 -31 529 0 163 44 323 137 501 291 243 210 429 488 714 1071 68 140 148 302 176 360 35 71 71 126 111 170 33 36 83 98 113 137 l54 73 102 -83 c231 -187 344 -242 609 -298 124 -26 369 -31 488 -10 273 48 509 137 710 269 172 114 276 246 413 524 l72 146 665 0 665 0 72 -146 c137 -278 241 -410 413 -524 198 -131 437 -221 710 -269 119 -21 364 -16 488 10 265 56 378 111 609 298 l102 83 54 -73 c29 -39 78 -99 109 -132 63 -69 80 -101 262 -475 303 -626 481 -900 726 -1117 178 -158 351 -260 517 -305 115 -31 385 -31 530 0 310 67 552 206 786 451 178 187 277 402 312 680 28 227 40 560 40 1106 -1 705 -23 1112 -116 2130 -100 1107 -104 1137 -175 1383 -87 301 -174 504 -288 675 -94 142 -343 367 -633 571 l-112 80 -11 55 c-6 31 -27 118 -46 194 -96 385 -204 558 -414 660 -137 67 -349 122 -610 158 -140 20 -434 17 -544 -5 -102 -20 -228 -64 -292 -101 -97 -57 -213 -183 -333 -362 -75 -113 -100 -168 -135 -299 -28 -108 -76 -378 -76 -430 l0 -31 -2610 0 -2610 0 0 31 c0 105 -82 482 -126 583 -33 77 -174 280 -252 364 -125 135 -240 198 -437 241 -105 22 -365 32 -490 18z m8135 -1386 c198 -55 331 -235 332 -449 0 -103 -21 -174 -79 -263 -129 -196 -410 -262 -613 -144 -240 139 -312 442 -159 671 49 74 104 120 190 160 109 51 206 58 329 25z m-7940 -523 l0 -279 -55 -69 c-91 -111 -234 -251 -281 -274 l-44 -21 -44 21 c-51 25 -162 131 -264 252 l-72 86 0 282 0 281 380 0 380 0 0 -279z m6833 -481 c127 -48 241 -168 282 -295 26 -79 26 -210 1 -285 -35 -103 -91 -179 -177 -240 -86 -60 -156 -82 -264 -84 -110 -1 -184 21 -270 79 -241 164 -273 511 -66 715 63 62 131 102 212 125 75 21 206 14 282 -15z m2209 19 c136 -29 262 -128 325 -257 35 -69 38 -83 41 -178 6 -150 -25 -237 -124 -343 -179 -194 -479 -197 -670 -7 -93 93 -133 194 -134 333 -1 290 275 512 562 452z m-9909 -79 c162 -130 287 -272 287 -325 0 -49 -114 -178 -279 -314 l-74 -61 -284 0 -283 0 0 373 c0 206 3 377 7 380 3 4 129 7 279 7 l273 0 74 -60z m1602 -320 l0 -375 -279 -3 -279 -2 -55 42 c-88 67 -242 219 -274 267 -15 25 -28 57 -28 72 0 54 137 204 309 337 l53 42 277 -2 276 -3 0 -375z m4242 54 c195 -64 351 -119 347 -124 -5 -4 -47 -19 -94 -34 -47 -14 -205 -66 -352 -115 l-268 -89 0 239 c0 131 3 239 6 239 3 0 166 -52 361 -116z m-2207 -119 l0 -225 -365 0 -365 0 0 225 0 225 365 0 365 0 0 -225z m-3095 -184 c55 -34 128 -105 227 -221 l98 -115 -2 -280 -3 -280 -375 0 -375 0 -3 281 -2 281 66 79 c99 118 162 181 228 230 64 49 95 54 141 25z m8326 -383 c177 -85 271 -231 271 -423 0 -138 -49 -254 -146 -343 -99 -91 -199 -126 -346 -120 -88 3 -104 7 -174 42 -383 189 -344 733 62 867 45 15 79 18 158 16 92 -3 109 -7 175 -39z m-6193 -794 c220 -45 429 -180 558 -360 58 -80 119 -211 145 -309 33 -120 33 -338 0 -455 -65 -231 -196 -412 -387 -537 -160 -104 -308 -147 -504 -147 -188 1 -343 46 -495 146 -351 230 -500 664 -365 1065 45 134 103 226 215 339 140 142 278 218 465 258 90 20 273 20 368 0z m4129 1 c302 -64 548 -262 664 -536 222 -521 -76 -1115 -628 -1251 -123 -30 -303 -30 -426 0 -216 53 -412 187 -535 365 -81 118 -125 221 -152 361 -17 83 -14 267 4 355 76 354 351 626 716 707 78 17 275 17 357 -1z`}
        viewBox={"0 0 12840 6552"}
        svgDimensions={{
          width: 32,
          height: 32
        }}
        fillColor={currentTheme.color}
        onClick={(): void => setShowControls(!showControls)}
      />
    </div>
  )
}

export default Controls