export const trimSlashPadding = (str: string): string => {
  return str.replace(/^\/|\/$/g, '')
}

export const minify = (markup: string): string => {
  return markup.replace(/\t|\n/g, '')
}

type AnyFn = (...args: any[]) => any
export const compareToStringEquality = (data1: AnyFn, data2: AnyFn): boolean => {
  return data1.toString() == data2.toString()
}
