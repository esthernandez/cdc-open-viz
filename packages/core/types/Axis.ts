export type Anchor = {
  value: string
  color: string
  lineStyle: string
}

export type Axis = {
  anchors?: Anchor[]
  dataKey: string
  dateDisplayFormat: string
  dateParseFormat: string
  displayNumbersOnBar?: boolean
  enablePadding?: boolean
  gridLines?: boolean
  hideAxis?: boolean
  hideLabel?: boolean
  hideTicks?: boolean
  label?: string
  labelOffset?: number
  labelPlacement?: string
  max?: string
  maxTickRotation?: number
  min?: string
  numTicks?: number
  rightAxisSize?: number
  rightHideAxis?: boolean
  rightHideLabel?: boolean
  rightHideTicks?: boolean
  rightLabel?: string
  rightLabelOffsetSize?: number
  rightMax?: string
  rightNumTicks?: number
  sortDates?: boolean
  showTargetLabel?: boolean
  size?: number
  target?: number
  targetLabel?: string
  tickRotation?: number
  tickWidthMax?: number
  type: string
}
