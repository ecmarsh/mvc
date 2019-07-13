import * as _ from 'lodash'
import { ModelData, AttrHandler, Observes, Synchronizes } from './types'

export default class Model<T extends ModelData> {
  constructor(
    public attributes: AttrHandler<T>,
    public observer: Observes,
    public synchronizer: Synchronizes<T>,
  ) { }

  // ATTRIBUTES
  public get = this.attributes.get
  public set = (updatedData: T): T => {
    const prevData = this.attributes.getAll()
    const hasChanged = !_.isEqual(prevData, updatedData)

    if (hasChanged) {
      this.attributes.set(updatedData)
      this.trigger('change', updatedData)
    }

    return updatedData
  }

  // OBSERVER
  public on = this.observer.on
  public off = this.observer.off
  public trigger = this.observer.trigger

  // SYNC
  public fetch = (): void => {
    const id = this.get(`id`)
    if (typeof id == 'number') {
      this.synchronizer.fetch(id)
        .then((res: any) => res.data)
        .then((data: any) => {
          this.set(data)
          this.trigger('fetched', data.toString())
        })
        .catch((err: any) => { this.trigger('error', err) })
    }
  }

  public save = (): void => {
    this.synchronizer.save(this.attributes.getAll())
      .then((res: any) => { res && this.set(res.data) })
      .catch((err: any) => { this.trigger('error', err) })
  }
}
