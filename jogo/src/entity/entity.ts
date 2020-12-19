import { Div } from '../infra/dom'

export class Entity {
  private _el: HTMLDivElement
  private _id: string

  constructor(private entityConfig: EntityConfiguration = {}) {
    this._id = this.entityConfig.id || this.randomID()
  }

  spawn(parentElement: HTMLElement = document.body) {
    parentElement.appendChild(this.root)
    this.onInit()
  }

  public get id(): string {
    return this._id
  }

  public show(): void {
    this.root.style.display = "block"
  }

  public hide(): void {
    this.root.style.display = "none"
  }

  public destroy() {
    if (this._el) {
      this.onDestroy()
      this._el.remove()
    }
  }

  public get root(): HTMLDivElement {
    if (!this._el) {
      this._el = this.createElement()
    }

    return this._el
  }

  protected get elementClassList(): string[] { return [] }
  protected get elementStyle(): Record<string, string> { return {} }

  protected onInit(): void { }
  protected onDestroy(): void { }

  private createElement(): HTMLDivElement {
    return Div({
      classList: ['entity', ...this.elementClassList],
      style: this.elementStyle
    })
  }

  private randomID(): string {
    const timestamp = Date.now().toString()

    const randomNumberAsString = () => (Math.random() * 10).toString()
    const randomSuffix = new Array(8).map(randomNumberAsString)

    return timestamp + randomSuffix
  }
}

export type EntityConfiguration = {
  id?: string,
}
