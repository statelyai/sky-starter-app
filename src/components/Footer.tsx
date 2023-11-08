export function Footer({ url }: { url: string }) {
  return (
    <div className="example-info">
      <a href={url} target="_blank">
        See the machine from this example in the Stately Studio
      </a>
      <p>
        Everything is multiplayer by default, we're using{' '}
        <a href="https://partykit.io" target="_blank">
          PartyKit 🎈
        </a>{' '}
        internally.
      </p>
      <p>
        So if you see the state change, it's because someone else is also using
        this example right now.
      </p>
    </div>
  );
}
