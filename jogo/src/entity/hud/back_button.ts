import { Component } from './component'
import * as template from './template/back_button.hbs'
import { GameInstance }  from '../../core/game'

export class BackButton extends Component<void> {
  protected get additionalElementClassList(): string[] {
    return ['button']
  }

  render(): string {
    return template({})
  }

  bindEvents() {
    const button = this.root.querySelector("#back-button")
    button && button.addEventListener('click', () => {
      const game = GameInstance()
      game.toLevelSelection()
    })

  }
}
