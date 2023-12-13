import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { __unsafe_getAllOwnEventDescriptors } from 'xstate';
import { Footer } from '../components/Footer';
import { NextEvents } from '../components/NextEvents';
import { skyConfig } from './counter.sky';

const url = 'https://sky.stately.ai/Wu5gAj';

export default function Counter() {
  // Try opening the app in multiple tabs to see the count change
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [state, send, , sky] = useStatelyActor(
    {
      apiKey: import.meta.env.VITE_SKY_API_KEY,
      url,
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

  return (
    <div>
      <div className="example-info">
        <h1>Counter</h1>
        <h2>Current count: {JSON.stringify(state.context.count)}</h2>
        <p>Number of users in session: {numberOfPlayers}</p>
      </div>

      <NextEvents
        nextEvents={__unsafe_getAllOwnEventDescriptors(state)}
        send={send}
      />
      <Footer url={url} />
    </div>
  );
}
