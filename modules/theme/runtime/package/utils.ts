import { hexFromArgb } from '@material/material-color-utilities'

/**
 * Tokenizes a string by replacing any occurrences of camelCase with hyphen-separated words.
 *
 * @param {string} str The string to tokenize.
 * @returns {string} The tokenized string.
 */
const tokenize = (str: string) => {
  return camelize(str)
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string.
 */
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Converts a hyphen-separated string into camelCase.
 *
 * @param {string} str The string to convert.
 * @returns {string} The converted string.
 */
const camelize = (str: string) =>
  str
    .split(/-|\s/)
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('')
    .replace(/^[A-Z]/, (str) => str.toLowerCase())

/**
 * Converts a hexadecimal color code to an RGB color value.
 * @param hex - A string representing a hexadecimal color code (e.g. "#ff0000").
 * @param separator
 * @returns A string representing the corresponding RGB color value (e.g. "255, 0, 0").
 */
const rgbFromHex = (hex: string, separator: string | false = ',') => {
  // Use a regular expression to match two hexadecimal digits at a time
  // and convert each pair to a decimal integer using parseInt with radix 16
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]
  // Return the RGB color value as a comma-separated string
  return separator === false
    ? `${r} ${g} ${b}`
    : `${r}${separator}${g}${separator}${b}`
}

/**
 * Converts an integer color value and alpha value to a hexadecimal color code with alpha value.
 * @param value - An integer color value (e.g. 0xff0000 for red).
 * @param alpha - A number between 0 and 1 representing the alpha value.
 * @returns A string representing the corresponding hexadecimal color code with alpha value.
 */
const hexAFromArgb = (value: number, alpha: number) => {
  // Use hexFromArgb function to convert the integer color value to a hexadecimal color code
  const colorHex = hexFromArgb(value)
  // Multiply alpha value by 255 to get alpha value between 0 and 255,
  // round it to the nearest integer using Math.round, and convert to two-digit hexadecimal string
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')
  // Concatenate the hexadecimal color code and alpha value as a string and return it
  return `${colorHex}${alphaHex}`
}

export { tokenize, hexAFromArgb, rgbFromHex }
