import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-midnight border-t border-border-white px-[6%] py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
        {/* Logo Column */}
        <div className="flex flex-col gap-2">
          <div className="font-serif text-2xl font-extrabold text-white">
            <span className="text-gold">H</span>obby
          </div>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col gap-4">
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
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
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
            href="mailto:hello@hobbyaccelerator.com"
            className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4">
          <Link
            href="/terms"
            className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-[13px] text-muted-text no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export function BottomBar() {
  return (
    <div className="bg-midnight border-t border-border-white/30 px-[6%] py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs text-white/60 items-center justify-center md:justify-start">
          <span>© 2026 Hobby · A Falcon Accelerator Company</span>
          <a href="mailto:hello@hobbyaccelerator.com" className="text-white/60 no-underline hover:text-white transition-colors">
            hello@hobbyaccelerator.com
          </a>
        </div>
        <p className="text-[12px] text-muted-text italic">Built for executives who"Hello" are done saying &quot;one day.&quot;</p>
      </div>
    </div>
  )
}
