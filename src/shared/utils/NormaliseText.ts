export const normalizeText = (str: string) => {
  return str
    .split('_')
    .map(el => el[0].toLocaleUpperCase() + el.slice(1))
    .join(' ')
}
