// figures source file - https://gojs.net/latest/samples/shapes.html

import {Geometry, PathFigure, PathSegment, Point, SegmentType, Shape, Spot} from "gojs";

// The following functions are used by a group of regular figures that are defined below:
const _CachedArrays: any[] = [];

function tempArray() {
  const temp = _CachedArrays.pop();
  if (temp === undefined)
    return [];
  return temp;
}

/**
 * @param a
 */
function freeArray(a: any) {
  a.length = 0; // clear any references to objects
  _CachedArrays.push(a);
}

/**
 * @param p1x
 * @param p1y
 * @param p2x
 * @param p2y
 * @param q1x
 * @param q1y
 * @param q2x
 * @param q2y
 * @param result
 */
function getIntersection(p1x: number, p1y: number, p2x: number, p2y: number, q1x: number, q1y: number, q2x: number, q2y: number, result: Point) {
  if (!result)
    result = new Point();
  const dx1 = p1x - p2x;
  const dx2 = q1x - q2x;
  let x = NaN;
  let y = NaN;
  if (dx1 === 0) {
    if (dx2 === 0) {
      if (p1x === p2x) {
        x = p1x;
        y = p1y;
      }
    } else {
      const m2 = (q1y - q2y) / dx2;
      const b2 = q1y - m2 * q1x;
      x = p1x;
      y = m2 * x + b2;
    }
  } else {
    if (dx2 === 0) {
      const m1 = (p1y - p2y) / dx1;
      const b1 = p1y - m1 * p1x;
      x = q1x;
      y = m1 * x + b1;
    } else {
      const m1 = (p1y - p2y) / dx1;
      const m2 = (q1y - q2y) / dx2;
      const b1 = p1y - m1 * p1x;
      const b2 = q1y - m2 * q1x;
      x = (b2 - b1) / (m1 - m2);
      y = m1 * x + b1;
    }
  }
  result.x = x;
  result.y = y;
  return result;
}

/**
 *
 */
/**
 * This allocates a temporary Array that should be freeArray()'ed by the caller.
 * @param sides
 */
function createPolygon(sides: any) {
  // Point[] points = new Point[sides + 1];
  const points = [];
  const radius = 0.5;
  const center = 0.5;
  const offsetAngle = Math.PI * 1.5;
  let angle = 0;
  // Loop through each side of the polygon
  for (let i = 0; i < sides; i++) {
    angle = ((2 * Math.PI) / sides) * i + offsetAngle;
    points[i] = new Point(center + radius * Math.cos(angle), center + radius * Math.sin(angle));
  }
  // Add the last line
  // points[points.length - 1] = points[0];
  points.push(points[0]);
  return points;
}

/**
 * This allocates a temporary Array that should be freeArray()'ed by the caller.
 * @param points
 */
function createStar(points: any) {
  // First, create a regular polygon
  const polygon = createPolygon(points);
  // Calculate the points inbetween
  const pts = tempArray(); // new Point[points * 2 + 1];
  const half = Math.floor(polygon.length / 2);
  const count = polygon.length - 1;
  const offset = points % 2 === 0 ? 2 : 1;
  for (let i = 0; i < count; i++) {
    // Get the intersection of two lines
    const p0 = polygon[i];
    const p1 = polygon[i + 1];
    const q21 = polygon[(half + i - 1) % count];
    const q2off = polygon[(half + i + offset) % count];
    pts[i * 2] = p0;
    pts[i * 2 + 1] = getIntersection(p0.x, p0.y, q21.x, q21.y, p1.x, p1.y, q2off.x, q2off.y, new Point()); // ?? not currently managed
  }
  pts[pts.length] = pts[0];
  freeArray(polygon);
  return pts;
}

export class CustomShape extends Shape {
}

CustomShape.defineFigureGenerator('FivePointedStar', function (_, w, h) {
  const starPoints = createStar(5);
  const geo = new Geometry();
  const fig = new PathFigure(starPoints[0].x * w, starPoints[0].y * h, true);
  geo.add(fig);

  for (let i = 1; i < 10; i++) {
    fig.add(new PathSegment(SegmentType.Line, starPoints[i].x * w, starPoints[i].y * h));
  }
  fig.add(new PathSegment(SegmentType.Line, starPoints[0].x * w, starPoints[0].y * h).close());
  freeArray(starPoints);
  geo.spot1 = new Spot(.266, .333);
  geo.spot2 = new Spot(.733, .733);
  return geo;
});

CustomShape.defineFigureGenerator('Heart', function (_, w, h) {
  const geo = new Geometry()
    .add(new PathFigure(0.5 * w, h, true)
      .add(new PathSegment(SegmentType.Bezier, 0, 0.3 * h, 0.1 * w, 0.8 * h, 0, 0.5 * h))
      .add(new PathSegment(SegmentType.Bezier, 0.5 * w, 0.3 * h, 0, 0, 0.45 * w, 0))
      .add(new PathSegment(SegmentType.Bezier, w, 0.3 * h, 0.55 * w, 0, w, 0))
      .add(new PathSegment(SegmentType.Bezier, 0.5 * w, h, w, 0.5 * h, 0.9 * w, 0.8 * h).close()))
    .setSpots(0.14, 0.29, 0.86, 0.78)

  return geo;
});

CustomShape.defineFigureGenerator('Octagon', function (_, w, h) {
  const points = createPolygon(8);
  const geo = new Geometry();
  const fig = new PathFigure(points[0].x * w, points[0].y * h, true);
  geo.add(fig);
  for (let i = 1; i < 8; i++) {
    fig.add(new PathSegment(SegmentType.Line, points[i].x * w, points[i].y * h));
  }
  fig.add(new PathSegment(SegmentType.Line, points[0].x * w, points[0].y * h).close());
  freeArray(points);
  geo.spot1 = new Spot(0.15, 0.15);
  geo.spot2 = new Spot(0.85, 0.85);
  return geo;
});




