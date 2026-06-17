"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface NavProps {
  showBackLink?: boolean
}

export function Navigation({ showBackLink = false }: NavProps) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-4 sm:px-[6%] sm:py-[18px] bg-midnight/90 backdrop-blur-[12px] border-b border-border-white transition-all duration-300 ${
        hasScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      <Link href="/" className="font-serif text-[22px] font-extrabold tracking-[1px] text-white no-underline">
        <span className="text-gold">H</span>obby
      </Link>

      {showBackLink ? (
        <Link
          href="/"
          className="text-[13px] text-cream/55 no-underline transition-colors duration-200 hover:text-gold"
        >
          Back to Hobby
        </Link>
      ) : (
        <>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#method"
              className="text-[13px] font-medium text-muted-text no-underline transition-colors duration-200 hover:text-white"
            >
              The Method
            </Link>
            <Link
              href="#who"
              className="text-[13px] font-medium text-muted-text no-underline transition-colors duration-200 hover:text-white"
            >
              Who It&apos;s For
            </Link>
            <Link
              href="#offer"
              className="text-[13px] font-medium text-muted-text no-underline transition-colors duration-200 hover:text-white"
            >
              Program
            </Link>
            <Link
              href="#quiz"
              className="bg-gold text-midnight px-[22px] py-[9px] rounded-md font-bold text-[13px] transition-colors duration-200 hover:bg-gold-lt"
            >
              Take the Quiz
            </Link>
          </div>
          <Link
            href="#quiz"
            className="inline-flex md:hidden bg-gold text-midnight px-4 py-2 rounded-md font-bold text-[12px] transition-colors duration-200 hover:bg-gold-lt"
          >
            Quiz
          </Link>
        </>
      )}
    </nav>
  )
}
