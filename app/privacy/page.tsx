'use client'

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="bg-midnight min-h-screen">
      <Navigation />
      <div className="px-[6%] py-20 max-w-4xl mx-auto">
        <h1 className="text-white font-serif text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-text text-sm mb-8">Last updated June 15, 2026</p>

        <div className="prose prose-invert max-w-none text-cream space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Introduction</h2>
            <p>
              Hobby Accelerator ("we", "us", "our", or "Company") operates the hobbyaccelerator.com website (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Site and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Company name</li>
                  <li>Job title</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Site is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Use of Data</h2>
            <p>Hobby Accelerator uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Site</li>
              <li>To notify you about changes to our Site</li>
              <li>To allow you to participate in interactive features of our Site when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Site</li>
              <li>To monitor the usage of our Site</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To send you newsletters, marketing or promotional materials and other information that may be of interest to you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> hello@hobbyaccelerator.com</li>
              <li><strong>Website:</strong> www.hobbyaccelerator.com</li>
            </ul>
          </section>

          <section className="mt-12 pt-8 border-t border-border-white">
            <p className="text-sm text-muted-text">
              By using the Hobby Accelerator website, you consent to our Privacy Policy.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
