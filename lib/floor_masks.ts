/**
 * Per-room floor polygon masks — perspective-correct trapezoids.
 * Each polygon defines ONLY the bare visible floor area.
 * Coordinates are normalized [0..1] fractions of canvas width/height.
 * Points order: [topLeft, topRight, bottomRight, bottomLeft]
 */

export type FloorPolygon = [
  [number, number], // top-left  [x, y]
  [number, number], // top-right [x, y]
  [number, number], // bottom-right [x, y]
  [number, number], // bottom-left [x, y]
]

const DEFAULT_POLY: FloorPolygon = [
  [0.0, 0.58], [1.0, 0.58], [1.0, 1.0], [0.0, 1.0]
]

/**
 * Per-room floor polygons hand-calibrated against real FloorWiz room images.
 * Tesla garage is conservative (y=0.70) so flakes NEVER paint over the car body or walls.
 */
export const FLOOR_MASKS: Record<string, FloorPolygon> = {
  // GARAGES
  garagetesla:      [[0.0, 0.70],[1.0, 0.70],[1.0, 1.0],[0.0, 1.0]],
  garage07:         [[0.03,0.58],[0.97,0.58],[1.0, 1.0],[0.0, 1.0]],
  garagecleardoors: [[0.0, 0.58],[1.0, 0.58],[1.0, 1.0],[0.0, 1.0]],
  garage08:         [[0.03,0.58],[0.97,0.58],[1.0, 1.0],[0.0, 1.0]],
  // BEDROOMS
  bedroom1:         [[0.0, 0.68],[1.0, 0.68],[1.0, 1.0],[0.0, 1.0]],
  bedroom2:         [[0.0, 0.65],[1.0, 0.65],[1.0, 1.0],[0.0, 1.0]],
  // LIVING ROOMS
  livingroom1:      [[0.03,0.60],[0.97,0.60],[1.0, 1.0],[0.0, 1.0]],
  livingroom2:      [[0.0, 0.58],[1.0, 0.58],[1.0, 1.0],[0.0, 1.0]],
  // KITCHEN
  kitchen1:         [[0.08,0.62],[0.92,0.62],[1.0, 1.0],[0.0, 1.0]],
  kitchenlivingduplex: [[0.0,0.60],[1.0,0.60],[1.0, 1.0],[0.0, 1.0]],
  // HALLWAY — strong perspective, narrow at top
  hallway:          [[0.22,0.52],[0.78,0.52],[1.0, 1.0],[0.0, 1.0]],
  // DINING
  dining2:          [[0.0, 0.60],[1.0, 0.60],[1.0, 1.0],[0.0, 1.0]],
  // OUTDOOR
  porch:            [[0.0, 0.55],[1.0, 0.55],[1.0, 1.0],[0.0, 1.0]],
  pooldeck:         [[0.0, 0.52],[1.0, 0.52],[1.0, 1.0],[0.0, 1.0]],
  // COMMERCIAL
  factory:          [[0.03,0.50],[0.97,0.50],[1.0, 1.0],[0.0, 1.0]],
  relivingroom:     [[0.0, 0.60],[1.0, 0.60],[1.0, 1.0],[0.0, 1.0]],
}

export function getFloorMask(roomId: string): FloorPolygon {
  return FLOOR_MASKS[roomId] ?? DEFAULT_POLY
}

/**
 * Apply a floor polygon as a canvas 2D clip path.
 * Converts normalized [0..1] coords → pixel coords.
 */
export function clipToFloor(
  ctx: CanvasRenderingContext2D,
  poly: FloorPolygon,
  canvasW: number,
  canvasH: number
): void {
  ctx.beginPath()
  ctx.moveTo(poly[0][0] * canvasW, poly[0][1] * canvasH)
  ctx.lineTo(poly[1][0] * canvasW, poly[1][1] * canvasH)
  ctx.lineTo(poly[2][0] * canvasW, poly[2][1] * canvasH)
  ctx.lineTo(poly[3][0] * canvasW, poly[3][1] * canvasH)
  ctx.closePath()
  ctx.clip()
}
