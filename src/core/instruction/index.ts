import { Hero } from '../hero';

export type Instruction = {
  name: string;
  label: string;
  action: () => Promise<any>;
};

export const InstructionFactory = (
  hero: Hero,
  availableInstructions: string[],
): Instruction[] => {
  const isAvailable = (instruction: Instruction) =>
    availableInstructions.includes(instruction.name);
  const filter = availableInstructions.length
    ? isAvailable
    : (_item: Instruction) => true;

  return [
    {
      name: 'move',
      label: 'Andar',
      action: () => hero.moveForward(),
    },
    {
      name: 'turn_left',
      label: 'Girar pra esquerda',
      action: () => hero.turnLeft(),
    },
    {
      name: 'turn_right',
      label: 'Girar pra direita',
      action: () => hero.turnRight(),
    },
    {
      name: 'say_yes',
      label: 'Dizer sim',
      action: () => hero.sayYes(),
    },
    {
      name: 'say_no',
      label: 'Dizer não',
      action: () => hero.sayYes(),
    },
    {
      name: 'read',
      label: 'Ler',
      action: () => hero.read(),
    },
    {
      name: 'say_memory',
      label: 'Falar',
      action: () => hero.sayMemory(),
    },
    {
      name: 'sum',
      label: 'Somar',
      action: () => hero.sum(),
    },
    {
      name: 'subtract',
      label: 'Subtrair',
      action: () => hero.subtract(),
    },
  ].filter(filter);
};

export * from './runner';
