import { ColorPalette } from '../../services/pallette'
import { Theme } from '../../services/theme'
import { uuid4 } from '../../services/uuid'

export class MultiVariantChartProps implements IMultiVariantChartProps {
  id: string
  variantCount: number
  charts: ChartProps[]
  ticks: number
  onTick: any
  stop: boolean
  height: number
  width: number
  backgroundColor?: string
  xAxisPointLimit?: number
  theme: Theme
  margin?: Margin
  interval: number
  headsup: number

  constructor(
    height: number,
    width: number,
    theme: Theme,
    id?: string,
    ticks?: number,
    onTick?: any,
    stop?: boolean,
    variantCount?: number,
    margin?: Margin,
    charts?: ChartProps[],
    interval?: number,
    headsup?: number,
  ) {
    this.variantCount = variantCount || 1
    this.charts = charts || []
    const chartPropExists = !!this.charts.length
    this.id = id || uuid4()
    this.ticks = ticks || 100
    this.onTick = onTick
    this.stop = stop || false
    for (let i = 0; i < this.variantCount; i++) {
      if (chartPropExists) {
        this.charts[i].label =
          this.charts && this.charts[i] && this.charts[i].label ? this.charts[i].label : `Dummy Chart ${i + 1}`
        this.charts[i].lineColor = ColorPalette[i]
      } else {
        this.charts.push({
          label: `Dummy Chart ${i + 1}`,
          lineColor: ColorPalette[i],
        })
      }
    }
    this.interval = interval || 1000
    this.height = height
    this.width = width
    this.headsup = headsup || 4
    this.theme = theme
    this.margin = margin || {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50,
    }
  }

  public static getInstance = (mv: IMultiVariantChartProps) => {
    return new MultiVariantChartProps(
      mv.height,
      mv.width,
      mv.theme,
      mv.id,
      mv.ticks,
      mv.onTick,
      mv.stop,
      mv.variantCount,
      mv.margin,
      mv.charts,
      mv.interval,
      mv.headsup,
    )
  }

  public addChart(index: number, chart: ChartProps): void {
    this.charts[index] = chart
  }
}

export type IMultiVariantChartProps = {
  id?: string
  variantCount: number
  charts: ChartProps[]
  height: number
  width: number
  ticks?: number
  onTick?: any
  stop?: boolean
  backgroundColor?: string
  xAxisPointLimit?: number
  theme: Theme
  margin?: Margin
  interval?: number
  headsup?: number
}

export interface ChartProps {
  label: string
  lineColor?: string
  backgroundColor?: string
}

export interface MultiVariantChartData {
  data: number
  xaxis: Date
}

export interface Margin {
  left?: number
  right?: number
  top?: number
  bottom?: number
}
