import { Entity } from '../entity';
import { Store } from '../../infra/store';

export type Binding = {
  elements: NodeListOf<HTMLElement>;
  event: string;
  action: (event: Event) => void;
};

export abstract class Component<T> extends Entity {
  protected isDestroyed = false;

  constructor(protected store: Store<T>) {
    super('hud-panel');

    this.store.listen((newState: T, oldState: T) => {
      this.update(newState, oldState);
    });

    this.update(store.current, store.current);
    this.bindEvents();
  }

  protected abstract render(newState: T): string;

  protected shouldUpdate(_newState: T, _oldState: T) {
    return true;
  }
  protected get bindings(): Binding[] {
    return [];
  }
  protected afterRender(): void {}

  private update(newState: T, oldState: T) {
    if (this.shouldUpdate(newState, oldState)) {
      this.root.innerHTML = this.render(newState);
      this.afterRender();
    }
  }

  private bindEvents(): void {
    this.bindings.forEach(binding => {
      binding.elements.forEach(target => {
        target.addEventListener(binding.event, binding.action);
      });
    });
  }

  protected onDestroy() {
    this.isDestroyed = true;
    this.bindings.forEach(binding => {
      binding.elements.forEach(target => {
        target.removeEventListener(binding.event, binding.action);
      });
    });
  }
}
