import { Instruction } from './index'

export const RunInstructions = async (
  availableInstructions: Instruction[],
  instructionList: string[]
) => {
    for (const instructionName of instructionList) {
      const instruction = instructionByName(instructionName, availableInstructions)

      if (instruction) {
        await instruction.action()
      }
    }
}

const instructionByName = (
  instructionName: string,
  instructionList: Instruction[]
): Instruction => {
  return instructionList.filter((instruction) => {
    return instruction.name === instructionName
  })[0]
}
