import { Hero } from '../hero'

export type Instruction = {
  name: string,
  label: string,
  action: () => Promise<any>,
}

export const InstructionFactory = (hero: Hero): Instruction[] => {
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
  ]
}

export * from './runner'
