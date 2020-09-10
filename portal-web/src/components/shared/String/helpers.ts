export const camelToSentenceCase = text => {
  return text && text.length > 0
    ? text
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^./g, text.charAt(0).toUpperCase())
    : ""
}
