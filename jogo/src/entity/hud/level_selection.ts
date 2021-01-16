import { Component } from './component'
import { LevelConfiguration } from '../../core/level_configuration'
import { Store } from '.././../infra/store'
import * as template from './template/level_selection.hbs'

export class LevelSelection extends Component<LevelConfiguration[]> {
  constructor(
    store: Store<LevelConfiguration[]>,
    private levelSelectionCallback: (level: LevelConfiguration) => void
  ) {
    super(store)
  }
  render(state: LevelConfiguration[]): string {
    return template({
      levels: state
    })
  }

  bindEvents() {
    const levelButtons = this.root.querySelectorAll("li[data-name]")

    levelButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const levelName = button.getAttribute('data-name')

        if (levelName) {
          const config = this.configForLevelName(levelName)
          this.levelSelectionCallback(config)
        }
      })
    })
  }

  protected get additionalElementClassList(): string[] {
    return ['level-selection']
  }

  private configForLevelName(name: string): LevelConfiguration {
    return this.store.current.filter(level => level.name === name)[0]
  }
}
