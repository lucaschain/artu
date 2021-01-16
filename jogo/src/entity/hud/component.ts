import { Entity } from '../entity'
import { Store } from '../../infra/store'

export abstract class Component<T> extends Entity {
  constructor(protected store: Store<T>) {
    super("hud-panel")

    this.store.listen((newState: T, oldState: T) => {
      this.update(newState, oldState)
    })

    this.update(store.current, store.current)
  }

  protected abstract render(newState: T): string

  protected shouldUpdate(_newState: T, _oldState: T) { return true }
  protected bindEvents(): void { }

  private update(newState: T, oldState: T) {
    if (this.shouldUpdate(newState, oldState)) {
      this.root.innerHTML = this.render(newState)
      this.bindEvents()
    }
  }
}
