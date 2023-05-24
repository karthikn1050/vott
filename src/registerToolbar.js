import { ToolbarItemFactory } from "./providers/toolbar/toolbarItemFactory"
import { ExportProject } from "./toolbar/exportProject"
import { SaveProject } from "./toolbar/saveProject"
import { ToolbarItemType } from "./toolbar/toolbarItem"
import { strings } from "./commons/strings"

export let ToolbarItemName

;(function(ToolbarItemName) {
  ToolbarItemName["SelectCanvas"] = "selectCanvas"
  ToolbarItemName["DrawRectangle"] = "drawRectangle"
  ToolbarItemName["DrawPolygon"] = "drawPolygon"
  ToolbarItemName["CopyRectangle"] = "copyRectangle"
  ToolbarItemName["CopyRegions"] = "copyRegions"
  ToolbarItemName["CutRegions"] = "cutRegions"
  ToolbarItemName["PasteRegions"] = "pasteRegions"
  ToolbarItemName["RemoveAllRegions"] = "removeAllRegions"
  ToolbarItemName["PreviousAsset"] = "navigatePreviousAsset"
  ToolbarItemName["NextAsset"] = "navigateNextAsset"
  ToolbarItemName["SaveProject"] = "saveProject"
  ToolbarItemName["ExportProject"] = "exportProject"
  ToolbarItemName["ActiveLearning"] = "activeLearning"
})(ToolbarItemName || (ToolbarItemName = {}))

export let ToolbarItemGroup

;(function(ToolbarItemGroup) {
  ToolbarItemGroup["Canvas"] = "canvas"
  ToolbarItemGroup["Regions"] = "regions"
  ToolbarItemGroup["Navigation"] = "navigation"
  ToolbarItemGroup["Project"] = "project"
})(ToolbarItemGroup || (ToolbarItemGroup = {}))

/**
 * Registers items for toolbar
 */
export default function registerToolbar() {
  ToolbarItemFactory.register({
    name: ToolbarItemName.SelectCanvas,
    tooltip: strings.editorPage.toolbar.select,
    icon: "fa-mouse-pointer",
    group: ToolbarItemGroup.Canvas,
    type: ToolbarItemType.State,
    accelerators: ["V", "v"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.DrawRectangle,
    tooltip: strings.editorPage.toolbar.drawRectangle,
    icon: "fa-vector-square",
    group: ToolbarItemGroup.Canvas,
    type: ToolbarItemType.State,
    accelerators: ["R", "r"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.DrawPolygon,
    tooltip: strings.editorPage.toolbar.drawPolygon,
    icon: "fa-draw-polygon",
    group: ToolbarItemGroup.Canvas,
    type: ToolbarItemType.State,
    accelerators: ["P", "p"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.CopyRectangle,
    tooltip: strings.editorPage.toolbar.copyRectangle,
    icon: "far fa-clone",
    group: ToolbarItemGroup.Canvas,
    type: ToolbarItemType.State,
    accelerators: ["CmdOrCtrl+W", "CmdOrCtrl+w"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.CopyRegions,
    tooltip: strings.editorPage.toolbar.copy,
    icon: "fa-copy",
    group: ToolbarItemGroup.Regions,
    type: ToolbarItemType.Action,
    accelerators: ["CmdOrCtrl+C", "CmdOrCtrl+c"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.CutRegions,
    tooltip: strings.editorPage.toolbar.cut,
    icon: "fa-cut",
    group: ToolbarItemGroup.Regions,
    type: ToolbarItemType.Action,
    accelerators: ["CmdOrCtrl+X", "CmdOrCtrl+x"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.PasteRegions,
    tooltip: strings.editorPage.toolbar.paste,
    icon: "fa-paste",
    group: ToolbarItemGroup.Regions,
    type: ToolbarItemType.Action,
    accelerators: ["CmdOrCtrl+V", "CmdOrCtrl+v"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.RemoveAllRegions,
    tooltip: strings.editorPage.toolbar.removeAllRegions,
    icon: "fa-ban",
    group: ToolbarItemGroup.Regions,
    type: ToolbarItemType.Action,
    accelerators: ["CmdOrCtrl+Delete", "CmdOrCtrl+Backspace"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.ActiveLearning,
    tooltip: strings.editorPage.toolbar.activeLearning,
    icon: "fas fa-graduation-cap",
    group: ToolbarItemGroup.Canvas,
    type: ToolbarItemType.Action,
    accelerators: ["CmdOrCtrl+D", "CmdOrCtrl+d"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.PreviousAsset,
    tooltip: strings.editorPage.toolbar.previousAsset,
    icon: "fas fa-arrow-circle-up",
    group: ToolbarItemGroup.Navigation,
    type: ToolbarItemType.Action,
    accelerators: ["ArrowUp", "W", "w"]
  })

  ToolbarItemFactory.register({
    name: ToolbarItemName.NextAsset,
    tooltip: strings.editorPage.toolbar.nextAsset,
    icon: "fas fa-arrow-circle-down",
    group: ToolbarItemGroup.Navigation,
    type: ToolbarItemType.Action,
    accelerators: ["ArrowDown", "S", "s"]
  })

  ToolbarItemFactory.register(
    {
      name: ToolbarItemName.SaveProject,
      tooltip: strings.editorPage.toolbar.saveProject,
      icon: "fa-save",
      group: ToolbarItemGroup.Project,
      type: ToolbarItemType.Action,
      accelerators: ["CmdOrCtrl+S", "CmdOrCtrl+s"]
    },
    SaveProject
  )

  ToolbarItemFactory.register(
    {
      name: ToolbarItemName.ExportProject,
      tooltip: strings.editorPage.toolbar.exportProject,
      icon: "fa-external-link-square-alt",
      group: ToolbarItemGroup.Project,
      type: ToolbarItemType.Action,
      accelerators: ["CmdOrCtrl+E", "CmdOrCtrl+e"]
    },
    ExportProject
  )
}
