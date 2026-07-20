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
          Last updated: July 2026
        </p>

        <p className="text-muted-foreground leading-relaxed mb-6">
          AllerLens helps you scan restaurant menus and understand allergen
          risks based on your personal allergen profile. This policy explains
          what data the app handles and where it goes.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          <strong className="text-foreground">Important:</strong> AllerLens
          provides informational guidance only, not medical advice. Always
          confirm allergen information with restaurant staff.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            The short version
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              AllerLens has{" "}
              <strong className="text-foreground">
                no accounts and no sign-in
              </strong>
              . There is nothing to register for.
            </li>
            <li>
              Your allergen profile, preferences, and scan history live{" "}
              <strong className="text-foreground">on your device only</strong>.
            </li>
            <li>
              When you scan a menu, the{" "}
              <strong className="text-foreground">
                photo is sent to our server
              </strong>{" "}
              to be read and translated, then{" "}
              <strong className="text-foreground">discarded</strong> — it is
              not stored.
            </li>
            <li>
              We do not sell your data, we do not track you across apps, and we
              show no ads.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What we handle and why
          </h2>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Menu photos</strong> – When
              you scan a menu, the photo is transmitted securely to our server,
              where it is processed using optical character recognition and AI
              services (Google Cloud Vision and Anthropic&apos;s Claude) to
              read the menu, translate it, and identify potential allergens.
              Menu photos are processed transiently and are{" "}
              <strong className="text-foreground">not retained</strong> on our
              servers after processing completes. The results — dish names,
              translations, and allergen tags — are returned to your device and
              saved locally.
            </li>
            <li>
              <strong className="text-foreground">
                Your allergen profile and preferences
              </strong>{" "}
              – Your selected allergens and app settings are stored locally on
              your device. They are used on your device to decide which dishes
              to flag. Your allergen selections accompany a scan request only so
              the results can be tailored to you, and are not stored on our
              servers or used for any other purpose.
            </li>
            <li>
              <strong className="text-foreground">
                Scan history and saved venues
              </strong>{" "}
              – Scans, saved restaurants, and favorite dishes are stored locally
              on your device in the app&apos;s database. They remain available
              offline and are never transmitted to us.
            </li>
            <li>
              <strong className="text-foreground">Location (optional)</strong>{" "}
              – If you grant location permission, your approximate location at
              the time of a scan is used to help identify the restaurant
              you&apos;re at. Location is used at scan time only. We do not
              track your location in the background and we do not keep a
              location history on our servers.
            </li>
            <li>
              <strong className="text-foreground">
                Camera and photo library
              </strong>{" "}
              – Camera access is used to photograph menus. Photo library access
              is used only for menus you choose to import. The app does not
              browse or upload anything you don&apos;t explicitly select.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Service providers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To provide the scanning feature, menu images are processed by
            Google Cloud Vision (text recognition) and Anthropic (translation
            and allergen analysis), acting on our behalf, along with our
            hosting provider. We do not sell or share your personal information
            with third parties for advertising or marketing.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Data retention and deletion
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Because your data is stored on your device, you are in control of
            it. You can erase everything at any time using{" "}
            <strong className="text-foreground">Clear local data</strong> in
            the app&apos;s Profile screen, or by deleting the app. Menu images
            we process are not retained, so there is nothing on our servers to
            delete.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Children
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AllerLens is not directed at children under 13, and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Changes to this policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If we materially change how the app handles data — for example, if
            optional accounts, cloud backup, or community features are
            introduced in a future version — we will update this policy and the
            &quot;last updated&quot; date before those changes take effect.
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
