'use client'

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="bg-midnight min-h-screen">
      <Navigation />
      <div className="px-[6%] py-20 max-w-4xl mx-auto">
        <h1 className="text-white font-serif text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-text text-sm mb-8">Last updated June 15, 2026</p>

        <div className="prose prose-invert max-w-none text-cream space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">AGREEMENT TO TERMS</h2>
            <p>
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and BW Solutions ("Company", "we", "us", or "our"), concerning your access to and use of the www.hobbyaccelerator.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>
            <p>
              Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">INTELLECTUAL PROPERTY RIGHTS</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.
            </p>
            <p>
              Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">USER REPRESENTATIONS</h2>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">USER REGISTRATION</h2>
            <p>
              You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">FEES AND PAYMENT</h2>
            <p>
              We accept the following forms of payment: Visa, Mastercard, and American Express. You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. All payments shall be in U.S. dollars.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">CANCELLATION</h2>
            <p>
              You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you are unsatisfied with our services, please email us at hello@hobbyaccelerator.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">PROHIBITED ACTIVITIES</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. As a user of the Site, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engage in unauthorized data mining, scraping, or systematic retrieval of Content</li>
              <li>Circumvent security features or interfere with Site networks</li>
              <li>Engage in fraudulent activities, identity theft, or impersonation</li>
              <li>Upload viruses or engage in spamming and harassment</li>
              <li>Use the Site for any illegal purpose or to compete commercially with us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">LIMITATION OF LIABILITY</h2>
            <p>
              In no event will the Company or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">GOVERNING LAW</h2>
            <p>
              These Terms shall be governed by and defined following the laws of Hong Kong. BW Apps and yourself irrevocably consent that the courts of Hong Kong shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border-white">
            <p className="text-sm text-muted-text">
              For questions about these Terms of Service, please contact us at hello@hobbyaccelerator.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
