import { Hero } from '../hero'

export type Instruction = {
  name: string,
  label: string,
  action: (speed: number) => Promise<any>,
}

export const InstructionFactory = (hero: Hero, availableInstructions?: string[]): Instruction[] => {
  const isAvailable = (instruction: Instruction) => availableInstructions.includes(instruction.name)
  const filter = availableInstructions.length ? isAvailable : (_item: Instruction) => true

  return [
    {
      name: 'move',
      label: 'Andar',
      action: (speed: number) => hero.moveForward(speed)
    },
    {
      name: 'turn_left',
      label: 'Girar pra esquerda',
      action: (speed: number) => hero.turnLeft(speed)
    },
    {
      name: 'turn_right',
      label: 'Girar pra direita',
      action: (speed: number) => hero.turnRight(speed)
    },
    {
      name: 'say_yes',
      label: 'Dizer sim',
      action: (_speed: number) => hero.sayYes()
    },
    {
      name: 'say_no',
      label: 'Dizer não',
      action: (_speed: number) => hero.sayNo()
    },
    {
      name: 'read',
      label: 'Ler',
      action: (_speed: number) => hero.read()
    },
    {
      name: 'say_memory',
      label: 'Falar',
      action: (_speed: number) => hero.sayMemory()
    },
    {
      name: 'sum',
      label: 'Somar',
      action: (_speed: number) => hero.sum()
    },
    {
      name: 'subtract',
      label: 'Subtrair',
      action: (_speed: number) => hero.subtract()
    },
  ].filter(filter)
}

export * from './runner'
