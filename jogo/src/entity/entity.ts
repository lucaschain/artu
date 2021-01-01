import { Div } from '../infra/dom'

export class Entity {
  private _el: HTMLDivElement

  constructor(private primaryElementClass: string) {}

  public spawn() {
    this.parentElement.appendChild(this.root)
    this.onInit()
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

  protected get elementClassList(): string[] {
    return [this.primaryElementClass, ...this.additionalElementClassList]
  }

  protected get additionalElementClassList(): string[] { return [] }
  protected elementStyle(): Record<string, string> { return {} }

  protected onInit(): void { }
  protected onDestroy(): void { }

  protected get parentElement(): HTMLElement {
    return document.body
  }

  private createElement(): HTMLDivElement {
    return Div({
      classList: ['entity', ...this.elementClassList],
      style: this.elementStyle()
    })
  }
}
