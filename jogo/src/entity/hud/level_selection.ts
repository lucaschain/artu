import { Binding, Component } from './component'
import { LevelConfiguration } from '../../core/level_configuration'
import { Store } from '.././../infra/store'
import { LevelState, LoadLevelSave } from '../../infra/save'
import * as template from './template/level_selection.hbs'

type LevelItem = {
  configuration: LevelConfiguration,
  state: LevelState,
}

export class LevelSelection extends Component<LevelConfiguration[]> {
  constructor(
    store: Store<LevelConfiguration[]>,
    private levelSelectionCallback: (level: LevelConfiguration) => void
  ) {
    super(store)
  }
  render(state: LevelConfiguration[]): string {

    const levels: LevelItem[] = state.map((configuration) => {
      const levelState = LoadLevelSave(configuration.name)?.state

      return {
        configuration,
        state: levelState || 0,
      }
    })

    return template({ levels })
  }

  protected get localBindings(): Binding[] {
    return [{
      event: 'click',
      elements: this.root.querySelectorAll("li[data-name]"),
      action: this.onClickLevel.bind(this)
    }]
  }

  onClickLevel(event: Event) {
    const button = event.currentTarget as HTMLElement
    const levelName = button.getAttribute('data-name')

    if (levelName) {
      const config = this.configForLevelName(levelName)
      this.levelSelectionCallback(config)
    }
  }

  protected get additionalElementClassList(): string[] {
    return ['level-selection']
  }

  private configForLevelName(name: string): LevelConfiguration {
    return this.store.current.filter(level => level.name === name)[0]
  }
}
