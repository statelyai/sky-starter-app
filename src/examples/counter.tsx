import { useStatelyActor } from '@statelyai/sky-react';
import { EventFrom } from 'xstate';
import { skyConfig } from './counter.sky';

const url = 'https://sky.stately.ai/Wu5gAj';

export default function Counter() {
  const [state, send] = useStatelyActor(
    {
      url: 'https://sky.stately.ai/Wu5gAj',
      sessionId: 'shared-counter',
    },
    skyConfig,
  );

  const isConnecting = send === undefined;
  if (isConnecting) {
    return <p>Connecting to Stately Sky...</p>;
  }

  // Cast the nextEvents to the types we know we can receive
  const nextEvents = state.nextEvents as unknown as EventFrom<
    typeof skyConfig.machine
  >['type'][];

  return (
    <div>
      <h1>
        <strong>Counter</strong>
      </h1>
      <h2>
        <strong>Current count: {JSON.stringify(state.context.count)}</strong>
      </h2>

      <div className="event-buttons">
        {nextEvents.map((event) => (
          <button key={event} onClick={() => send?.({ type: event })}>
            {event}
          </button>
        ))}
      </div>
      <p>
        Everything is multiplayer by default, we're using{' '}
        <a href="https://partykit.io" target="_blank">
          PartyKit 🎈
        </a>{' '}
        internally. So if you see the count change, it's because someone else is
        also using this example right now.
      </p>
      <a href={url} target="_blank">
        See the counter machine in the editor
      </a>
    </div>
  );
}
