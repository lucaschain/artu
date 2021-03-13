import { Instruction } from './index'

type InstructionCallback = (
  instruction: Instruction, index: number
) => Promise<void>

export class InstructionRunner {
  private lastInstructionsRan: Instruction[] = []

  public constructor(
    private availableInstructions: Instruction[],
  ) {}

  public async runInstructions(
    instructionList: string[],
    shouldStop: () => boolean = () => false,
  ): Promise<void> {
    const instructionsRan: Instruction[] = []
    let stillSameAsBefore = true

    await this.forEachInstruction(
      instructionList,
      shouldStop,
      async (instruction: Instruction, index: number) => {
        const lastRan = this.lastInstructionsRan[index]
        const isSameInstruction = lastRan && (lastRan.name === instruction.name)

        const speed = isSameInstruction && stillSameAsBefore ? 2 : 1
        await instruction.action(speed)
        instructionsRan.push(instruction)
      }
    )
    this.lastInstructionsRan = instructionsRan
  }

  private async forEachInstruction(
    instructions: string[],
    shouldStop: () => boolean = () => false,
    callback: InstructionCallback
  ) {
    let index = 0
    for (const instructionName of instructions) {
      if (shouldStop()) {
        break
      }
      const instruction = this.instructionByName(instructionName)
      await callback(instruction, index)
      index++
    }
  }

  private instructionByName(
    instructionName: string,
  ): Instruction | null {
    return this.availableInstructions.filter((instruction) => (
      instruction.name === instructionName
    ))[0]
  }
}

