import Guard from "../../commons/guard"

/**
 * @name - Export Provider Factory
 * @description - Creates instance of export providers based on request provider type
 */
export class ExportProviderFactory {
  /**
   * @returns Dictionary of registered providers
   */
  static get providers() {
    return { ...ExportProviderFactory.providerRegistry }
  }

  /**
   * @returns Options from specified default provider
   */
  static get defaultProvider() {
    return ExportProviderFactory.defaultProviderOptions
  }

  /**
   * Registers a factory method for the specified export provider type
   * @param options - The options to use when registering an export provider
   */
  static register(options) {
    Guard.null(options)
    Guard.empty(options.name)
    Guard.empty(options.displayName)
    Guard.null(options.factory)

    // The first provider registered will be the default
    if (ExportProviderFactory.defaultProviderOptions === null) {
      ExportProviderFactory.defaultProviderOptions = options
    }
    ExportProviderFactory.providerRegistry[options.name] = options
  }

  /**
   * Creates new instances of the specified export provider
   * @param name - The name of the export provider to instantiate
   * @param project - The project to load into the export provider
   * @param options  - The provider specific options for exporting
   */
  static create(name, project, options) {
    Guard.empty(name)
    Guard.null(project)

    const handler = ExportProviderFactory.providerRegistry[name]
    if (!handler) {
      throw new Error(
        `No export provider has been registered with name '${name}'`
      )
    }

    return handler.factory(project, options)
  }

  /**
   * Create export provider from project
   * @param project VoTT project
   */
  static createFromProject(project) {
    return ExportProviderFactory.create(
      project.exportFormat.providerType,
      project,
      project.exportFormat.providerOptions
    )
  }

  static providerRegistry = {}
  static defaultProviderOptions = null
}
