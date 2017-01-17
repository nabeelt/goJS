var $ = go.GraphObject.make;
var myDiagram =
  $(go.Diagram, "sampleDiagram",
    {
      initialContentAlignment: go.Spot.Center, // center Diagram contents
      "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
    });

// define a simple Node template
myDiagram.nodeTemplate =
  $(go.Node, "Horizontal",
    {background: "#44ccff"},
    // the entire node will have a light-blue background
    $(go.Picture,
      // Pictures should normally have an explicit width and height.
      // This picture has a red background, only visible when there is no source set
      // or when the image is partially transparent.
      { margin: 10, width: 50, height: 50, background: "#fff" },
      // Picture.source is data bound to the "source" attribute of the model data
      new go.Binding("source")),
    $(go.TextBlock,
      "Default Text",  // the initial value for TextBlock.text
      // some room around the text, a larger font, and a white stroke:
      { margin: 12, stroke: "grey", font: "bold 16px arial" },
      // TextBlock.text is data bound to the "name" attribute of the model data
      new go.Binding("text", "name"))
  );

// myDiagram.linkTemplate =
//   $(go.Link,
//     { routing: go.Link.Orthogonal, corner: 0 },
//     $(go.Shape, { strokeWidth: 1, stroke: "#555" }));

var model = $(go.TreeModel);

model.nodeDataArray =
[ // note that each node data object holds whatever properties it needs;
  // for this app we add the "name" and "source" properties
  { key: "1",              name: "Text 1",   source: "images/cat1.png" },
  { key: "2", parent: "1", name: "Text 2",    source: "images/cat1.png" },
  { key: "3", parent: "1", name: "Text 3",   source: "images/cat1.png" },
  { key: "4", parent: "3", name: "Text 4", source: "images/cat1.png" },
  { key: "5", parent: "3", name: "Text 5",     source: "images/cat1.png" },
  { key: "6", parent: "2", name: "Text 6", source: "images/cat1.png" }
];
myDiagram.model = model;