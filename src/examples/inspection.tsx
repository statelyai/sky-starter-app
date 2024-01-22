import { createBrowserInspector } from '@statelyai/inspect';
import { useActor } from '@xstate/react';
import { __unsafe_getAllOwnEventDescriptors } from 'xstate';
import { NextEvents } from '../components/NextEvents';
import { inspectionMachine } from '../inspectMachine';

export default function Inspection() {
  const { inspect } = createBrowserInspector();
  const [state, send] = useActor(inspectionMachine, {
    inspect,
  });

  return (
    <div>
      <div className="example-info">
        <h1>Inspection</h1>
        <h2>Current state: {JSON.stringify(state.value)}</h2>
      </div>

      <NextEvents
        nextEvents={__unsafe_getAllOwnEventDescriptors(state)}
        send={send}
      />
    </div>
  );
}
