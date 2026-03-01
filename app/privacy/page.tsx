import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AllerLens privacy policy: what data we collect, how we use it, and your choices.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <article className="container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AllerLens Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: February 2025
        </p>

        <p className="text-muted-foreground leading-relaxed mb-10">
          AllerLens (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;) is a
          menu-scanning app that helps you identify allergens and translate menu
          items. This policy describes what data we collect, how we use it, and
          your choices.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data we collect
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Allergy and diet preferences</strong> – Your
              selected allergens and preferences (e.g. show calories, preferred
              translation language) are stored on your device. If you sign in,
              they are synced to your account so you can use the app on other
              devices.
            </li>
            <li>
              <strong className="text-foreground">Scan history</strong> – Menus you scan,
              detected dishes, and any notes or tags you add are stored locally.
              If you sign in, this data is backed up to your account (encrypted
              in transit).
            </li>
            <li>
              <strong className="text-foreground">Location (optional)</strong> – With your
              permission, we use your device&apos;s location to derive city and
              region so we can group your scans by place. Precise GPS is optional
              and off by default. We do not track your location continuously.
            </li>
            <li>
              <strong className="text-foreground">Account data</strong> – If you sign in with
              Google, we receive your email and name from Google. We use this
              only to identify your account and sync your data.
            </li>
            <li>
              <strong className="text-foreground">Photos / camera</strong> – We access the
              camera and photo library only to scan menus and save images you
              choose. We do not upload menu images to our servers for storage;
              processing is done on-device or for the purpose of providing the
              service (e.g. translation).
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            How we use data
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>To provide scanning, allergen detection, and translation.</li>
            <li>
              To organize your scans by location (city/region) when you have
              allowed location access.
            </li>
            <li>
              To sync your preferences and scan history across devices when you
              are signed in.
            </li>
            <li>
              We do not sell your personal data. We do not use your data for
              advertising or share it with third parties for their marketing.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Where data is stored
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">On your device</strong> – Preferences and scan
              history are stored locally (e.g. SQLite). You can clear this at
              any time from Profile → Clear Local Data.
            </li>
            <li>
              <strong className="text-foreground">In the cloud (if you sign in)</strong> – Synced
              data is stored in our secure backend (Supabase) and is associated
              only with your account. You can delete your account and data from
              Profile → Delete Account.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Your choices
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Location</strong> – You can deny or revoke
              location permission in your device settings. The app will still
              work; location-based grouping will be limited.
            </li>
            <li>
              <strong className="text-foreground">Account</strong> – You can use the app without
              signing in. Sign-in is optional and used only for backup and
              cross-device sync.
            </li>
            <li>
              <strong className="text-foreground">Delete data</strong> – You can clear local data
              or delete your account (and all synced data) from the Profile
              screen.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use industry-standard encryption (e.g. HTTPS, secure storage) for
            data in transit and, where applicable, at rest. You are responsible
            for keeping your device and account credentials secure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Changes to this policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this policy from time to time. We will post the updated
            policy at this URL and, where required by law, notify you of
            material changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this privacy policy or your data,
            contact us at{" "}
            <a
              href="mailto:allerlens.app@gmail.com"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Email AllerLens at allerlens.app@gmail.com"
            >
              allerlens.app@gmail.com
            </a>
            .
          </p>
        </section>
      </article>
      <Footer />
    </main>
  )
}
