var newDiagram = $(go.Diagram, "freehandDrawing",{
	initialContentAlignment: go.Spot.Left, // center Diagram contents
    "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
})

newDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool());

newDiagram.nodeTemplate =
      $(go.Part,
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          selectionAdorned: true, selectionObjectName: "SHAPE",
          selectionAdornmentTemplate:  // custom selection adornment: a blue rectangle
            $(go.Adornment, "Auto",
              $(go.Shape, { stroke: "dodgerblue", fill: null }),
              $(go.Placeholder, { margin: -1 }))
        },
        { resizable: true, resizeObjectName: "SHAPE" },
        { rotatable: true, rotateObjectName: "SHAPE" },
        { reshapable: true },  // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(go.Shape,
          { name: "SHAPE", fill: null, strokeWidth: 1.5 },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("angle").makeTwoWay(),
          new go.Binding("geometryString", "geo").makeTwoWay(),
          new go.Binding("fill"),
          new go.Binding("stroke"),
          new go.Binding("strokeWidth")));

    // create drawing tool for newDiagram, defined in FreehandDrawingTool.js
    var tool = new FreehandDrawingTool();
    // provide the default JavaScript object for a new polygon in the model
    tool.archetypePartData =
      { stroke: "green", strokeWidth: 3 };
    // install as first mouse-down-tool
    newDiagram.toolManager.mouseDownTools.insertAt(0, tool);

    load();  // load a simple diagram from the textarea
  }

  function mode(draw) {
    // assume FreehandDrawingTool is the first tool in the mouse-down-tools list
    var tool = newDiagram.toolManager.mouseDownTools.elt(0);
    tool.isEnabled = draw;
  }

  function updateAllAdornments() {  // called after checkboxes change Diagram.allow...
    newDiagram.selection.each(function(p) { p.updateAdornments(); });
  }

  // save a model to and load a model from Json text, displayed below the Diagram
  function save() {
    var str = '{ "position": "' + go.Point.stringify(newDiagram.position) + '",\n  "model": ' + newDiagram.model.toJson() + ' }';
    document.getElementById("mySavedDiagram").value = str;
  }
  function load() {
    var str = document.getElementById("mySavedDiagram").value;
    try {
      var json = JSON.parse(str);
      newDiagram.initialPosition = go.Point.parse(json.position || "0 0");
      newDiagram.model = go.Model.fromJson(json.model);
      newDiagram.model.undoManager.isEnabled = true;
    } catch (ex) {
      alert(ex);
    }
  }