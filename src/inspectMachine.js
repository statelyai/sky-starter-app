import { createInspector } from '@statelyai/sky';
import { createActor, createMachine } from 'xstate';
export const inspectionMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEsB2sAOYDGAXZA9qgHTIQA2YAxLLgIYBOuA2gAwC6ioGBsy+RLiAAeiAIwAWAGzEJAZmkBOAExyAHMrVjlAVgA0IAJ6ItxHQF9zBtJhwCSuABZoA1mig1KYDG05IQPHz2QqIIylKKxGpyihIA7HE6MaxSugbGCJISltboWHiEJLBeGO40uAQ+HEKB-IUh4nJxUTHxicmp+kaIyqw6xLqWViCoBBBwQjb5wf61M6ChALRS6YjLOSBTdoWkFGA1vHWC-qESyqsIphbDWwVExE6u7gdB9Sc9cWIDKlKsuh1pbqXL7XXK2O5FErPWaHeYiHo6ZrRWIJJKKFKAjK9bJDIA */
  id: 'inspection',
  initial: 'idle',
  states: {
    idle: {
      on: {
        start: 'thinking',
      },
    },

    thinking: {
      on: {
        sleep: 'sleeping',
      },
    },

    sleeping: {
      on: {
        stop: 'idle',
      },
    },
  },
});

const { inspect } = createInspector({ apiKey: 'my-api-key' });
const actor = createActor(inspectionMachine, {
  inspect,
});
