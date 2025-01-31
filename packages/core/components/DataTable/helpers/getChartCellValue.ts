import { parseDate, formatDate } from '@cdc/core/helpers/cove/date'
import { formatNumber } from '@cdc/core/helpers/cove/number'

// if its additional column, return formatting params
const isAdditionalColumn = (column, config) => {
  let inthere = false
  let formattingParams = {}
  const { columns } = config
  if (columns) {
    Object.keys(columns).forEach(keycol => {
      const col = columns[keycol]
      if (col.name === column) {
        inthere = true
        formattingParams = {
          addColPrefix: col.prefix,
          addColSuffix: col.suffix,
          addColRoundTo: col.roundToPlace ? col.roundToPlace : '',
          addColCommas: col.commas
        }
      }
    })
  }
  return formattingParams
}

export const getChartCellValue = (row, column, config, runtimeData) => {
  if (config.table.customTableConfig) return runtimeData[row][column]
  const rowObj = runtimeData[row]
  let cellValue // placeholder for formatting below
  let labelValue = rowObj[column] // just raw X axis string
  if (column === config.xAxis?.dataKey) {
    // not the prettiest, but helper functions work nicely here.
    cellValue = config.xAxis?.type === 'date' ? formatDate(config.xAxis?.dateDisplayFormat, parseDate(config.xAxis?.dateParseFormat, labelValue)) : labelValue
  } else {
    let resolvedAxis = 'left'
    let leftAxisItems = config.series ? config.series.filter(item => item?.axis === 'Left') : []
    let rightAxisItems = config.series ? config.series.filter(item => item?.axis === 'Right') : []

    leftAxisItems.map(leftSeriesItem => {
      if (leftSeriesItem.dataKey === column) resolvedAxis = 'left'
    })

    rightAxisItems.map(rightSeriesItem => {
      if (rightSeriesItem.dataKey === column) resolvedAxis = 'right'
    })

    let addColParams = isAdditionalColumn(column, config)
    if (addColParams) {
      cellValue = config.dataFormat ? formatNumber(runtimeData[row][column], resolvedAxis, false, config, addColParams) : runtimeData[row][column]
    } else {
      cellValue = config.dataFormat ? formatNumber(runtimeData[row][column], resolvedAxis, false, config) : runtimeData[row][column]
    }
  }

  return cellValue
}
