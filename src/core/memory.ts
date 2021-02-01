import { Store } from '../infra/store';

export type MemoryShard = number | string;

export class Memory {
  private stack: MemoryShard[] = [];

  constructor(private store: Store<MemoryShard[]>) {}

  public reset() {
    this.stack = [];
    this.updateStore();
  }

  public push(shard: MemoryShard) {
    if (shard == null) {
      return;
    }

    this.stack.push(shard);
    this.updateStore();
  }

  public pop(): MemoryShard {
    const current = this.stack.pop();
    this.updateStore();
    return current as MemoryShard;
  }

  public sum(num: number): boolean {
    const current = this.pop();

    const canSum = typeof current === 'number';
    if (canSum) {
      const sum = (current as number) + num;
      this.push(sum);
      return true;
    }

    return false;
  }

  private updateStore() {
    this.store.update(this.stack);
  }
}
