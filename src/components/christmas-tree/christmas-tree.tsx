import {ReactDiagram, ReactPalette} from "gojs-react";
import './christmas-tree.scss';
import {initDiagram} from "../../services/diagram";
import {initPalette, paletteNodeDataArray} from "../../services/palette.ts";
import DownloadImage from "../download-image/download-image.tsx";

export function ChristmasTree() {
  return (
    <div className={'tree-layout'}>
      <div className={'tree-options'}>
        <ReactPalette
          initPalette={initPalette}
          divClassName='palette-component'
          nodeDataArray={paletteNodeDataArray}
        />
        <DownloadImage/>
      </div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={[]}
      />
    </div>
  )
}