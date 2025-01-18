import {Margin, Palette, Spot} from "gojs";
import {getPaletteTemplate} from "./ornaments-templates.ts";

export const paletteNodeDataArray = [
  {key: "circle", category: "Circle"},
  {key: "star", category: "Star"},
  {key: "heart", category: "Heart"},
  {key: "octagon", category: "Octagon"},
  {key: "diamond", category: "Diamond"},
];

export const initPalette = (): Palette => {
  const palette = new Palette({
    contentAlignment: Spot.Center,
    padding: new Margin(20, 20, 20, 20)
  })

  // add ornaments templates
  palette.nodeTemplateMap.add('Circle', getPaletteTemplate('Circle', 'blue'))
  palette.nodeTemplateMap.add('Star', getPaletteTemplate('FivePointedStar', 'yellow'))
  palette.nodeTemplateMap.add('Heart', getPaletteTemplate('Heart', 'red'))
  palette.nodeTemplateMap.add('Octagon', getPaletteTemplate('Octagon', 'green'))
  palette.nodeTemplateMap.add('Diamond', getPaletteTemplate('Diamond', 'purple'))

  return palette
}
