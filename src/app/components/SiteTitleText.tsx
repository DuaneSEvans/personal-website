type SiteTitleTextProps = {
  className?: string
}

const SITE_TITLE_TEXT = "Duane's website."

export default function SiteTitleText({ className = "" }: SiteTitleTextProps) {
  const classes = ["inline-block", className].filter(Boolean).join(" ")

  return <span className={classes}>{SITE_TITLE_TEXT}</span>
}
