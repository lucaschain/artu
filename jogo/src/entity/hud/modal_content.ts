import { template } from 'handlebars'
import { Store } from '../../infra/store'
import { Component } from './component'

export class ModalContent extends Component<void> {
  constructor(store: Store<void>, private templatePath: string) {
    super(store)
  }

  render(): string {
    const template = require('./template/back_button.hbs')
    return template({})
  }
}
