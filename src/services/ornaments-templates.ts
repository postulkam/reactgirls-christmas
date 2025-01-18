import {Binding, Part, Point, Size, Stretch} from "gojs";
import {CustomShape} from "./figures.ts";

export const getPaletteTemplate = (name: string, color: string): Part => {
  return new Part({})
    .add(new CustomShape(name, {
        width: 40,
        height: 40,
        fill: color
      }
    ))
}

export const getDiagramTemplate = (name: string, color: string): Part => {
  return new Part({
    resizable: true,
    reshapable: true,
    desiredSize: new Size(40, 40)
  })
    .bind(new Binding("location", "loc", Point.parse).makeTwoWay(Point.stringify))
    .add(new CustomShape(name, {
        stretch: Stretch.Fill,
        fill: color
      }
    ))
}
