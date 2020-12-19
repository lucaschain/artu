type UpdateCallback<T> = (newState: T, oldState: T) => void

export class Store<T> {
  state: T
  listeners: UpdateCallback<T>[] = []

  constructor(initialState: T) {
    this.state = initialState
  }

  get current(): T {
    return this.state
  }

  update(newState: T) {
    const oldState = this.state
    this.state = newState
    this.dispatchUpdate(newState, oldState)
  }

  listen(updateCallback: UpdateCallback<T>) {
    this.listeners.push(updateCallback)
  }

  private dispatchUpdate(newState: T, oldState: T) {
    this.listeners.forEach(callback => {
      callback(newState, oldState)
    })
  }
}
