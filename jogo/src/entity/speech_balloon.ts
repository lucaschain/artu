import { Entity } from './entity'
import { Vector } from '../math/vector'

export class SpeechBalloon extends Entity {
  constructor(
    private position: Vector,
    private text: string,
    durationMs: number = 3000,
    private priority: boolean = false
  ) {
    super()
    if (durationMs) {
      setTimeout(() => {
        this.destroy()
      }, durationMs)
    }
  }

  public spawn() {
    this.root.innerText = this.text
    super.spawn()
  }

  protected elementStyle() {
    return {
      left: `${this.position.x}px`,
      top: `${this.position.y}px`
    }
  }

  protected get elementClassList() {
    let classes = ['speech-balloon']

    if (this.priority) {
      classes.push("priority")
    }

    return classes
  }

  protected get parentElement(): HTMLElement {
    return document.querySelector('.board') as HTMLElement
  }
}
