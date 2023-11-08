// This file was generated by the XState CLI, please do not edit it manually.
import { createMachine } from 'xstate';

const machine = createMachine(
  {
    context: {
      timer: 0,
    },
    id: 'Traffic Light',
    initial: 'green',
    states: {
      green: {
        description: 'The light is green. Cars can proceed safely.',
        after: {
          '2000': {
            target: '#Traffic Light.yellow',
            actions: [],
            meta: {},
          },
        },
      },
      yellow: {
        description: 'The light is yellow. Cars should prepare to stop.',
        after: {
          '2000': {
            target: '#Traffic Light.red',
            actions: [],
            meta: {},
          },
        },
      },
      red: {
        description: 'The light is red. Cars should stop.',
        after: {
          '2000': {
            target: '#Traffic Light.green',
            actions: [],
            meta: {},
          },
        },
      },
    },
    types: { context: {} as { timer: number } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
);
export const skyConfig = {
  actorId: '6180c12b-01d4-477a-b63d-979595e0d82b',
  machine,
};