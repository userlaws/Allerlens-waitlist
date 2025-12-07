import { Html, Head, Preview, Body, Container, Text, Button, Hr, Link } from "@react-email/components";

export default function BetaInvite({ email, iosUrl, androidUrl }: { email: string; iosUrl?: string; androidUrl?: string; }) {
  return (
    <Html>
      <Head />
      <Preview>Your beta invite is here — scan your first menu in under 30 seconds.</Preview>
      <Body style={{ background: "#fff", fontFamily: "Inter, Arial, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Your AllerLens beta invite 🔓</Text>
          <Text>As promised, here’s early access. Thanks for helping us build a safer dining tool.</Text>

          {iosUrl && (
            <Button href={iosUrl} style={{ background: "#16a34a", color: "#fff", padding: "12px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 600, display: "inline-block", marginRight: 8 }}>
              Join on iOS
            </Button>
          )}
          {androidUrl && (
            <Button href={androidUrl} style={{ background: "#16a34a", color: "#fff", padding: "12px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 600, display: "inline-block" }}>
              Join on Android
            </Button>
          )}

          <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
          <Text style={{ fontSize: 14, margin: 0 }}>
            Quick tips:<br/>
            • Good lighting + flat menu = best results.<br/>
            • Multi-column and bilingual menus are supported.<br/>
            • Tap a dish to see allergen reasons and confidence.
          </Text>

          <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
          <Text style={{ fontSize: 12, color: "#475569" }}>
            Need help? Reply to this email or see the FAQ at{" "}
            <Link href="https://allerlens.app/#faq">allerlens.app</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

