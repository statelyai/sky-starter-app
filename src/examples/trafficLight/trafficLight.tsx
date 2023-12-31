import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { __unsafe_getAllOwnEventDescriptors } from 'xstate';
import { Footer } from '../../components/Footer';
import { NextEvents } from '../../components/NextEvents';
import { Light } from './Light';
import './lights.css';
import { skyConfig } from './trafficLight.sky';

const url = 'https://sky.stately.ai/C1Q8MC';

export default function TrafficLight() {
  // Try opening the app in multiple tabs to see the count change
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [state, send, , sky] = useStatelyActor(
    {
      apiKey: import.meta.env.VITE_SKY_API_KEY,
      url,
      sessionId: 'traffic-lights',
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

  const activeLight = state.value.toString();

  return (
    <div>
      <div className="example-info">
        <h1>Traffic Light</h1>
        <h2>Current light: {activeLight}</h2>
        <div className="trafficLight">
          <Light color="red" isActive={activeLight === 'red'} />
          <Light color="yellow" isActive={activeLight === 'yellow'} />
          <Light color="green" isActive={activeLight === 'green'} />
        </div>
        <p>Number of users observing the lights: {numberOfPlayers}</p>
      </div>

      <NextEvents
        nextEvents={__unsafe_getAllOwnEventDescriptors(state)}
        send={send}
      />
      <Footer url={url} />
    </div>
  );
}
