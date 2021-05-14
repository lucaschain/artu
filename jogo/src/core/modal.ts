import { ModalSkeleton } from "../entity/hud/modal_skeleton"
import { Store } from "../infra/store"

export class Modal {
  private skeleton: ModalSkeleton
  constructor(private templateName: string) {}

  create(): void {
    this.skeleton = new ModalSkeleton(new Store<string>(this.templateName))
    this.skeleton.spawn()
  }

  destroy(): void {
    this.skeleton.destroy()
  }
}
