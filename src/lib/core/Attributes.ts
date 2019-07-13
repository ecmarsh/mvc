import { AttrHandler } from './types'

export default class Attributes<T> implements AttrHandler<T> {
  constructor(private data: T) {
    this.data = Object.assign({}, data)
  }

  get = <K extends keyof T>(propName: K): T[K] => this.data[propName]
  set = (updatedData: T): T => Object.assign(this.data, updatedData)
  getAll = (): T => this.data
}