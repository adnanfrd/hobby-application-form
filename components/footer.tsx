import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-midnight border-t border-border-white px-[6%] py-10 flex flex-col md:flex-row justify-between items-center gap-5">
      <div className="font-serif text-xl font-extrabold text-white">
        <span className="text-gold">H</span>obby
      </div>
      <div className="flex gap-7 flex-wrap justify-center">
        <Link
          href="#method"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          The Method
        </Link>
        <Link
          href="#who"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          Who It&apos;s For
        </Link>
        <Link
          href="#offer"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          Program
        </Link>
        <Link
          href="#quiz"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          Take the Quiz
        </Link>
        <Link
          href="/survey"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          Survey
        </Link>
        <a
          href="mailto:hello@gethobby.com"
          className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
        >
          Contact
        </a>
      </div>
      <p className="text-xs text-white/20">© 2026 Hobby · A Falcon Accelerator Company · hello@gethobby.com</p>
    </footer>
  )
}
