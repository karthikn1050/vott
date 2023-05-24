import { ActionTypes } from "./actionTypes"

/**
 * Creates action and validates type of action type name
 * @param type Name for action being created
 */
// tslint:disable-next-line:max-line-length
export function createAction(type) {
  return () => ({
    type
  })
}

/**
 * Create action with payload
 * @param type Name for action being created
 */
// tslint:disable-next-line:max-line-length
export function createPayloadAction(type) {
  return payload => ({
    type,
    payload
  })
}

/**
 * Helper instance of catch-all
 */
export const anyOtherAction = createAction(ActionTypes.ANY_OTHER_ACTION)
