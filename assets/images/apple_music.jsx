import * as React from "react"
import Svg, { Rect, LinearGradient, Stop, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Apple Music"
    viewBox="0 0 512 512"
    {...props}
  >
    <Rect width={512} height={512} fill="url(#a)" rx="15%" />
    <LinearGradient id="a" x1={0.5} x2={0.5} y1={0.99} y2={0.02}>
      <Stop offset={0} stopColor="#FA233B" />
      <Stop offset={1} stopColor="#FB5C74" />
    </LinearGradient>
    <Path
      fill="#fff"
      d="M199 359V199q0-9 10-11l138-28q11-2 12 10v122q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69V88s0-20-17-15l-170 35s-13 2-13 18v203q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69"
    />
  </Svg>
)
export default SvgComponent
