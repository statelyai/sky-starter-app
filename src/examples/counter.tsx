import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { EventFrom } from 'xstate';
import { skyConfig } from './counter.sky';

const url = 'https://sky.stately.ai/Wu5gAj';

export default function Counter() {
  // Try opening the app in multiple tabs to see the count change
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [state, send, , sky] = useStatelyActor(
    {
      url: 'https://sky.stately.ai/Wu5gAj',
      sessionId: 'shared-counter',
      // These callbacks are optional, but can be useful for updating UI
      // Warning the numbers are not guaranteed to be accurate in dev mode because of hot-reloading
      // To see the real current number try a page-refresh
      onPlayerJoined(info) {
        setNumberOfPlayers(info.numberOfPlayers);
      },
      onPlayerLeft(info) {
        setNumberOfPlayers(info.numberOfPlayers);
      },
    },
    skyConfig,
  );

  if (sky.isConnecting) {
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
      <h2>
        <strong>Number of users in session: {numberOfPlayers}</strong>
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
