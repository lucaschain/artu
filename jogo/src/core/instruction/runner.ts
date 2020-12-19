import { Instruction } from './index'

export const RunInstructions = async (
  availableInstructions: Instruction[],
  instructionList: string[],
  shouldStop: () => boolean = () => false,
) => {
  for (const instructionName of instructionList) {
    if (shouldStop()) {
      break
    }
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
