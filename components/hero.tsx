import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-[100svh] flex flex-col justify-center px-5 sm:px-[6%] pt-28 pb-16 sm:pt-36 sm:pb-24 bg-navy relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-300px] right-[-200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(200,149,42,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(80,100,200,0.04)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex max-w-full items-center gap-2 bg-gold/10 border border-border-gold rounded-full px-4 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-[1.8px] uppercase text-gold mb-9 w-fit">
          <span className="w-1.5 h-1.5 bg-gold rounded-full" />
          <span className="truncate">Falcon Accelerator Family | Hobby</span>
        </div>

        <h1 className="font-serif text-[clamp(42px,6.5vw,88px)] font-extrabold leading-[1.05] max-w-[860px] mb-7 text-white">
          Your buried idea
          <br />
          <em className="italic text-gold">deserves a real shot.</em>
        </h1>

        <p className="text-[17px] sm:text-xl text-muted-text max-w-[600px] leading-[1.75] mb-10 sm:mb-12">
          You&apos;ve spent years building other people&apos;s products.
          <br />
          <strong className="text-cream font-medium">
            The 90 day accelerator for corporate professionals who are done saying &quot;one day.&quot;
          </strong>
        </p>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6 mb-14 sm:mb-[72px]">
          <Link
            href="#quiz"
            className="inline-flex justify-center bg-gold text-midnight px-6 sm:px-8 py-4 rounded-md font-bold text-[15px] tracking-[0.3px] no-underline transition-colors duration-200 hover:bg-gold-lt"
          >
            Take the 90 Second Idea Readiness Quiz
          </Link>
          <Link
            href="#method"
            className="inline-flex items-center gap-2 text-muted-text text-sm font-medium no-underline transition-colors duration-200 hover:text-white"
          >
            See how it works
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 pt-9 sm:pt-12 border-t border-border-white md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-10">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-serif text-[clamp(36px,5vw,52px)] font-black text-gold leading-none">90</span>
            <span className="text-[12px] text-muted-text uppercase tracking-[1.5px] font-medium">
              Days to validated business
            </span>
          </div>
          <div className="hidden md:block w-px h-12 bg-border-white" />
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-serif text-[clamp(36px,5vw,52px)] font-black text-gold leading-none">8</span>
            <span className="text-[12px] text-muted-text uppercase tracking-[1.5px] font-medium">Seats per cohort</span>
          </div>
          <div className="hidden md:block w-px h-12 bg-border-white" />
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-serif text-[clamp(36px,5vw,52px)] font-black text-gold leading-none">0%</span>
            <span className="text-[12px] text-muted-text uppercase tracking-[1.5px] font-medium">Equity taken</span>
          </div>
          <div className="hidden md:block w-px h-12 bg-border-white" />
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-serif text-[clamp(36px,5vw,52px)] font-black text-gold leading-none">5</span>
            <span className="text-[12px] text-muted-text uppercase tracking-[1.5px] font-medium">Stage framework</span>
          </div>
        </div>
      </div>
    </section>
  )
}
