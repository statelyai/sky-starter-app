import { useStatelyActor } from '@statelyai/sky-react';
import { useState } from 'react';
import { Footer } from '../../components/Footer';
import { NextEvents } from '../../components/NextEvents';
import { Light } from './Light';
import './lights.css';
import { skyConfig } from './trafficLight.sky';

const url = 'https://sky.stately.ai/Q9VvW9';

export default function TrafficLight() {
  // Try opening the app in multiple tabs to see the count change
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [state, send, , sky] = useStatelyActor(
    {
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

      <NextEvents nextEvents={state.nextEvents} send={send} />
      <Footer url={url} />
    </div>
  );
}
