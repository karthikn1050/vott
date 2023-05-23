import LocalizedStrings from "react-localization"
import { english } from "./localization/en-us"
import { spanish } from "./localization/es-cl"
import { japanese } from "./localization/ja"
import { chinesetw } from "./localization/zh-tw"
import { korean } from "./localization/ko-kr"
import { chinese } from "./localization/zh-ch"

export const strings = new LocalizedStrings({
  // TODO: Need to comment out other languages which will not be used
  en: english,
  es: spanish,
  ja: japanese,
  tw: chinesetw,
  ko: korean,
  ch: chinese
})

/**
 * Add localization values to JSON object. Substitutes value
 * of variable placeholders with value of currently set language
 * Example variable: ${strings.profile.settings}
 * @param json JSON object containing variable placeholders
 */
export function addLocValues(json) {
  return interpolateJson(json, { strings })
}

/**
 * Stringifies the JSON and substitutes values from params
 * @param json JSON object
 * @param params Parameters for substitution
 */
export function interpolateJson(json, params) {
  const template = JSON.stringify(json)
  const outputJson = interpolate(template, params)
  return JSON.parse(outputJson)
}

/**
 * Makes substitution of values in string
 * @param template String containing variables
 * @param params Params containing substitution values
 */
export function interpolate(template, params) {
  const names = Object.keys(params)
  const vals = Object["values"](params)
  return new Function(...names, `return \`${template}\`;`)(...vals)
}
