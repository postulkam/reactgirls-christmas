import {Diagram, GraphLinksModel, Part, Picture} from "gojs";
import {getDiagramTemplate} from "./ornaments-templates.ts";

export const initDiagram = (): Diagram => {
  const diagram = new Diagram({
    'undoManager.isEnabled': true,  // must be set to allow for model change listening
    'clickCreatingTool.archetypeNodeData': {text: 'new node', color: 'lightblue'},
    "panningTool.isEnabled": false,
    allowVerticalScroll: false,
    allowHorizontalScroll: false,
    model: new GraphLinksModel(
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      })
  })

  // add the christmas tree to the diagram background
  diagram.add(
    new Part()
      .add(new Picture({
          pickable: false,
          source: 'src/assets/christmas-tree.png',
          width: 500,
          height: 500,
        }),
      )
  )

  // add ornaments templates
  diagram.nodeTemplateMap.add('Circle', getDiagramTemplate('Circle', 'blue'))
  diagram.nodeTemplateMap.add('Star', getDiagramTemplate('FivePointedStar', 'yellow'))
  diagram.nodeTemplateMap.add('Heart', getDiagramTemplate('Heart', 'red'))
  diagram.nodeTemplateMap.add('Octagon', getDiagramTemplate('Octagon', 'green'))
  diagram.nodeTemplateMap.add('Diamond', getDiagramTemplate('Diamond', 'purple'))


  return diagram;
}