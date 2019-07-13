export interface AttrHandler<T> {
  get: <K extends keyof T>(key: K) => T[K]
  set: (value: T) => T
  getAll: () => T
}

export interface Synchronizes<T> {
  fetch: (id: number) => Promise<any>
  save: (data: T) => Promise<any>
}

export interface Observes {
  on: (eventName: string, callback: EventCallback) => void
  off: (eventName?: string, callback?: EventCallback) => void
  trigger: (eventName: string, ...args: any[]) => void
}

export type EventCallback = (...args: any[]) => any
export type EventMap = { [eventName: string]: EventCallback }
export type ObservedEvents = { [eventName: string]: EventCallback[] }

export type Deserializer<T, U> = (json: U) => T

export type DOMRenderer = (markup?: string) => void

export interface Renderable {
  render: () => void
  renderDOM: DOMRenderer
}

export interface ModelData {
  [key: string]: any
  id?: number
}

export type TemplateContent = DocumentFragment