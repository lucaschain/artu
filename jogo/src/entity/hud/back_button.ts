import { Binding, Component } from './component'
import * as template from './template/back_button.hbs'
import { GameInstance }  from '../../core/game'

export class BackButton extends Component<void> {
  protected get additionalElementClassList(): string[] {
    return ['back-button']
  }

  render(): string {
    return template({})
  }

  protected get localBindings(): Binding[] {
    return [
      {
        elements: this.root.querySelectorAll("#back-button"),
        action: this.onClickBackButton,
        event: 'click',
      }
    ]
  }

  private onClickBackButton(_event: Event) {
    const game = GameInstance()
    game.toLevelSelection()
  }
}
