import { Component } from './component'
import { MemoryShard } from '../../core/memory'
import * as template from './template/memory_list.hbs'

export class MemoryList extends Component<MemoryShard[]> {
  protected get additionalElementClassList(): string[] {
    return ['memory-list']
  }

  render(memories: MemoryShard[]): string {
    return template({ memories })
  }
}
