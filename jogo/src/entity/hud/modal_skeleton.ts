import { Store } from '../../infra/store'
import { Component } from './component'
import * as template from './template/modal_skeleton.hbs'

export class ModalSkeleton extends Component<string> {
  render(state: string): string {
    return template({ children: require(`./template/${state}.hbs`) })
  }
}
