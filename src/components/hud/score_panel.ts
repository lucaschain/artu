import { Component } from './component';
import * as template from './template/score_panel.hbs';

export class ScorePanel extends Component<number> {
  protected get additionalElementClassList(): string[] {
    return ['score-panel'];
  }

  render(state: number): string {
    return template({
      score: state,
    });
  }
}
