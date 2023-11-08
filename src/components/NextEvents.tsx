import { AnyEventObject, EventDescriptor } from 'xstate';

export function NextEvents<T extends AnyEventObject>({
  nextEvents,
  send,
}: {
  nextEvents: EventDescriptor<T>[];
  send?: (event: T) => void;
}) {
  return (
    <div className="next-events">
      <h2>{nextEvents.length > 1 ? 'Next possible events' : 'Next event'}</h2>
      <div className="event-buttons">
        {nextEvents.map((event) => (
          <button key={event} onClick={() => send?.({ type: event } as T)}>
            {event}
          </button>
        ))}
      </div>
    </div>
  );
}
