interface Props {
  label: string
  value: string | number
  accent?: 'primary' | 'secondary' | 'default'
}

export default function CardStatBadge({ label, value, accent = 'default' }: Props) {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    default: 'text-text',
  }

  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-bold font-display ${colors[accent]}`}>
        {value}
      </span>
    </div>
  )
}