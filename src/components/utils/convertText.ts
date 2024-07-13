export const convertText = (text: string) => {
  return `${text[0]}${text.slice(1).toLowerCase()}`
}
