import { Component } from './component'
import { MemoryShard } from '../../core/memory'
import * as template from './template/memory_list.hbs'

export class MemoryList extends Component<MemoryShard[]> {
  protected get elementClassList(): string[] { return ['hud-panel', 'memory-list'] }

  render(state: MemoryShard[]): string {
    return template({
      memories: state
    })
  }
}
