import { Hero } from '../hero'

export type Instruction = {
  name: string,
  label: string,
  action: () => Promise<any>,
}

export const InstructionFactory = (hero: Hero, availableInstructions?: string[]): Instruction[] => {
  const isAvailable = (instruction: Instruction) => availableInstructions.includes(instruction.name)
  const filter = availableInstructions.length ? isAvailable : (_item: Instruction) => true

  return [
    {
      name: 'move',
      label: 'Andar',
      action: () => hero.moveForward()
    },
    {
      name: 'turn_left',
      label: 'Girar pra esquerda',
      action: () => hero.turnLeft()
    },
    {
      name: 'turn_right',
      label: 'Girar pra direita',
      action: () => hero.turnRight()
    },
    {
      name: 'say_yes',
      label: 'Dizer sim',
      action: () => hero.sayYes()
    },
  ].filter(filter)
}

export * from './runner'
