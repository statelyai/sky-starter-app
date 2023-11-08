export function Light({
  color,
  isActive,
}: {
  color: string;
  isActive: boolean;
}) {
  return <div className={`light ${color} ${isActive ? 'active' : ''}`}></div>;
}
