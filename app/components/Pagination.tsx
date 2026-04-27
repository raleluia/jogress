interface Props {
  page: number
  hasMore: boolean
  prevHref: string
  nextHref: string
}

export default function Pagination({ page, hasMore, prevHref, nextHref }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      {page > 1 ? (
        <a
          href={prevHref}
          className="px-5 py-2 rounded-lg border border-border text-sm text-muted hover:border-primary hover:text-primary transition-colors"
        >
          ← Previous
        </a>
      ) : (
        <span className="px-5 py-2 rounded-lg border border-border text-sm text-faint opacity-40 cursor-not-allowed">
          ← Previous
        </span>
      )}

      <span className="text-sm text-muted tabular-nums">Page {page}</span>

      {hasMore ? (
        <a
          href={nextHref}
          className="px-5 py-2 rounded-lg border border-border text-sm text-muted hover:border-primary hover:text-primary transition-colors"
        >
          Next →
        </a>
      ) : (
        <span className="px-5 py-2 rounded-lg border border-border text-sm text-faint opacity-40 cursor-not-allowed">
          Next →
        </span>
      )}
    </div>
  )
}