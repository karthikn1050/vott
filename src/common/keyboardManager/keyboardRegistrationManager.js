import Guard from "../../commons/guard"
import { AppError, ErrorCode } from "../../models/applicationState"

/**
 * Managers keyboard event registrations
 */
export class KeyboardRegistrationManager {
  registrations = {}

  /**
   * Registers a keyboard binding and returns a function to deregister that binding
   * @param binding Properties for keyboard binding (type of key event, keyCodes, handler, etc.)
   * @returns a function for deregistering the keyboard binding
   */
  registerBinding = binding => {
    const { keyEventType, accelerators, handler, displayName } = binding
    Guard.null(keyEventType)
    Guard.expression(accelerators, keyCodes => keyCodes.length > 0)
    Guard.null(handler)

    let eventTypeRegistrations = this.registrations[keyEventType]
    if (!eventTypeRegistrations) {
      eventTypeRegistrations = {}
      this.registrations[keyEventType] = eventTypeRegistrations
    }

    accelerators.forEach(keyCode => {
      const currentBinding = this.registrations[keyEventType][keyCode]
      if (currentBinding) {
        let error = `Key code ${keyCode} on key event "${keyEventType}" `
        error += `already has binding registered: "${currentBinding.displayName}." `
        error += `Cannot register binding "${displayName}" with the same key code and key event type`
        throw new AppError(ErrorCode.OverloadedKeyBinding, error)
      }
      this.registrations[keyEventType][keyCode] = binding
    })

    return () => {
      binding.accelerators.forEach(keyCode => {
        delete this.registrations[binding.keyEventType][keyCode]
      })
    }
  }

  /**
   * Gets a list of registered event handlers for the specified key code
   * @param keyEventType Type of key event (keydown, keyup, keypress)
   * @param keyCode The key code combination, ex) CmdOrCtrl+1
   */
  getHandler(keyEventType, keyCode) {
    Guard.null(keyEventType)
    Guard.null(keyCode)

    const keyEventTypeRegs = this.registrations[keyEventType]
    return keyEventTypeRegs && keyEventTypeRegs[keyCode]
      ? keyEventTypeRegs[keyCode].handler
      : null
  }

  /**
   * Invokes all registered event handlers for the specified key code\
   * @param keyEventType Type of key event (keydown, keyup, keypress)
   * @param keyCode The key code combination, ex) CmdOrCtrl+1
   * @param evt The keyboard event that was raised
   */
  invokeHandler(keyEventType, keyCode, evt) {
    Guard.null(keyCode)
    Guard.null(evt)

    const handler = this.getHandler(keyEventType, keyCode)
    if (handler !== null) {
      handler(evt)
    }
  }

  getRegistrations = () => {
    return this.registrations
  }
}
