import { ToolbarItem } from "../../react/components/toolbar/toolbarItem"
import Guard from "../../common/guard"

/**
 * @name - Toolbar Item Factory
 * @description - Creates instance of Toolbar Items based on specified options
 */
export class ToolbarItemFactory {
  /**
   * Register Toolbar Item for use in editor page
   * @param component - React component ToolbarItem
   * @param config - Configuration of ToolbarItem
   */
  static register(config, component = ToolbarItem) {
    Guard.null(component)
    Guard.null(config)

    ToolbarItemFactory.componentRegistry.push({ component, config })
  }

  /**
   * Get all registered Toolbar Items
   */
  static getToolbarItems() {
    return [...ToolbarItemFactory.componentRegistry]
  }

  /**
   * Clear ToolbarItem Registry
   */
  static reset() {
    ToolbarItemFactory.componentRegistry = []
  }

  static componentRegistry = []
}
