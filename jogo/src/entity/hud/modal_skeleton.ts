import { Binding, Component } from './component'
import * as template from './template/modal_skeleton.hbs'
import { GameInstance }  from '../../core/game'

export class ModalSkeleton extends Component<string> {
  render(state: string): string {
    return template({ children: require(`./template/${state}.hbs`) })
  }

  protected get localBindings(): Binding[] {
    return [
      {
        elements: this.root.querySelectorAll(".modal-skeleton--close"),
        action: this.onClickBackButton.bind(this),
        event: 'click',
      }
    ]
  }

  private onClickBackButton(_event: Event) {
    this.root.querySelector(".modal-skeleton").
      classList.add('modal-skeleton--fadeout')
    const game = GameInstance()
    setTimeout(() => {
      game.destroyModal()
    }, 1000)
  }
}
