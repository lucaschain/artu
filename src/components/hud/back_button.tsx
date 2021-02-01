import React from 'react';
import { Binding, Component } from './component';
import * as template from './template/back_button.hbs';
import { GameInstance } from '../../core/game';
import { Store } from '../../infra/store';

export class BackButton extends React.Component {
  destroy() {}

  spawn() {}

  protected get additionalElementClassList(): string[] {
    return ['button'];
  }

  private onClickBackButton(_event: Event) {
    const game = GameInstance();
    game.toLevelSelection();
  }

  render() {
    return <div>back button</div>;
  }
}
