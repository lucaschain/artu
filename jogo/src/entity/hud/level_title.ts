import { Component } from './component'
import * as template from './template/level_title.hbs'

export class LevelTitle extends Component<string> {
  protected get additionalElementClassList(): string[] {
    return ['level-title']
  }

  render(title: string): string {
    return template({ title })
  }
}
