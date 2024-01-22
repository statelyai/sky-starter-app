import PartySocket from 'partysocket';
import WebSocket from 'ws';

// const url = 'localhost:1999';
const partySocket = new PartySocket({
  host: 'localhost:1999',
  room: 'testing',
  WebSocket,
});
partySocket.onclose = (e) => {
  console.log('closed', JSON.stringify(e));
};
partySocket.onopen = () => {
  console.log('opened');
};
partySocket.onmessage = (message) => {
  console.log(message);
};
partySocket.onerror = (error) => {
  console.log(JSON.stringify(error), error);
};
