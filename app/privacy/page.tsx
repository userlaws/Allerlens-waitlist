import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AllerLens privacy policy: your data stays on your device — no accounts, no tracking, menu photos processed transiently and never stored.",
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
          Last updated: August 2026
        </p>

        <p className="text-muted-foreground leading-relaxed mb-6">
          AllerLens (&quot;we&quot;, &quot;our&quot;, or the app) is a
          menu-scanning app that helps you identify allergens and translate
          menu items. This policy describes what data the app handles, how it
          is used, and your choices.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          <strong className="text-foreground">The short version:</strong> your
          data lives on your device. AllerLens has no accounts, no sign-in, and
          no cloud sync. Menu photos are sent to our server only to process
          your scan and are never stored.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data stored on your device
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">
                Allergy and diet preferences
              </strong>{" "}
              – Your selected allergens and settings (e.g. preferred
              translation language) are stored only on your device.
            </li>
            <li>
              <strong className="text-foreground">Scan history</strong> – Menus
              you scan, detected dishes, and any items you save are stored only
              on your device.
            </li>
            <li>
              <strong className="text-foreground">Location (optional)</strong>{" "}
              – With your permission, we use your device&apos;s location to
              derive city and region so the app can group your scans by place.
              Location data stays on your device. Precise GPS is optional and
              off by default. We do not track your location continuously.
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            You can remove all of this at any time from{" "}
            <strong className="text-foreground">
              Profile → Clear local data
            </strong>
            . Deleting the app also deletes it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Menu photos and scanning
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            When you scan a menu, the photo is sent over an encrypted
            connection (HTTPS) to our server, where an AI service analyzes it
            to translate the menu and detect potential allergens. The image and
            your selected allergens are used only to process that scan.{" "}
            <strong className="text-foreground">
              We do not store your menu photos or scan results on our servers
            </strong>{" "}
            — the results are returned to your device and the server-side data
            is discarded.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What we don&apos;t do
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              We do <strong className="text-foreground">not</strong> require or
              offer accounts — there is nothing to sign in to.
            </li>
            <li>
              We do <strong className="text-foreground">not</strong> sell your
              personal data.
            </li>
            <li>
              We do <strong className="text-foreground">not</strong> use your
              data for advertising or share it with third parties for their
              marketing.
            </li>
            <li>
              We do <strong className="text-foreground">not</strong> store your
              photos, scans, or allergen profile on our servers.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Your choices
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Location</strong> – You can
              deny or revoke location permission in your device settings. The
              app still works; location-based grouping will be limited.
            </li>
            <li>
              <strong className="text-foreground">Camera and photos</strong> –
              The app accesses the camera and photo library only when you scan
              a menu or choose an image. You can revoke these permissions in
              device settings.
            </li>
            <li>
              <strong className="text-foreground">Delete your data</strong> –
              Use{" "}
              <strong className="text-foreground">
                Profile → Clear local data
              </strong>
              , or delete the app. Because we don&apos;t store your data in the
              cloud, this removes everything.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Important note about allergen detection
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AllerLens uses AI to detect potential allergens and may make
            mistakes or miss ingredients. Results are informational and are not
            medical advice. Always confirm ingredients and preparation with
            restaurant staff before eating, especially if you have a severe
            allergy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Data sent to our server for scan processing travels over encrypted
            connections (HTTPS). Data on your device is protected by your
            device&apos;s security. You are responsible for keeping your device
            secure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Changes to this policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this policy from time to time — for example, if a
            future version adds optional accounts or sync, this policy will be
            updated before those features launch. We will post the updated
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
