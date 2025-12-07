import {
  Html, Head, Preview, Body, Container, Img, Section,
  Text, Button, Hr, Link
} from "@react-email/components";

const brand = {
  green: "#16a34a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
};

export default function WaitlistWelcome({ email, id }: { email: string; id?: number }) {
  const unsubscribeUrl = id 
    ? `https://allerlens.app/api/unsubscribe?id=${id}&email=${encodeURIComponent(email)}`
    : `https://allerlens.app/unsubscribe?e=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head />
      <Preview>You're on the waitlist — we’ll ping you when the beta opens.</Preview>
      <Body style={{ background: "#ffffff", fontFamily: "Inter, Arial, sans-serif", color: brand.text }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "24px" }}>
          <Section style={{ textAlign: "center", marginTop: 4, marginBottom: 18 }}>
            <Img 
              src="https://allerlens.app/icon.png" 
              alt="AllerLens" 
              width="80" 
              height="103" 
              style={{ margin: "0 auto", display: "block" }} 
            />
          </Section>

          <Text style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
            Welcome to AllerLens 🎉
          </Text>

          <Text style={{ fontSize: 14, color: brand.sub, margin: "0 0 14px" }}>
            Thanks for joining the waitlist with <strong>{email}</strong>. You’ll be first to know when our private beta opens.
          </Text>

          <Section style={{ background: "#f8fafc", border: `1px solid ${brand.border}`, borderRadius: 12, padding: 16 }}>
            <Text style={{ margin: 0, fontSize: 14 }}>
              • <strong>Scan any menu</strong> — fast, geometry-aware OCR (works on multi-column & bilingual menus).<br/>
              • <strong>Instant allergen flags</strong> — dairy, nuts, gluten and more.<br/>
              • <strong>Privacy-first</strong> — your allergy profile stays on your device.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: 18 }}>
            <Button
              href="https://allerlens.app/#see-it-in-action?utm_source=email&utm_medium=waitlist&utm_campaign=welcome"
              style={{
                background: brand.green, color: "#fff", padding: "12px 18px",
                borderRadius: 10, textDecoration: "none", fontWeight: 600, display: "inline-block"
              }}
            >
              See it in action
            </Button>
          </Section>

          <Text style={{ fontSize: 14, marginTop: 18 }}>
            Want early access? Hit reply and tell us what cuisines you scan most (e.g., Thai, diner, coffee shop).
            Real menus help us tune detection and get you in faster.
          </Text>

          <Hr style={{ borderColor: brand.border, margin: "20px 0" }} />

          <Text style={{ fontSize: 12, color: brand.sub, marginBottom: 10 }}>
            Share with a friend who eats out with allergies:
          </Text>
          <Text style={{ fontSize: 12 }}>
            <Link
              href="https://twitter.com/intent/tweet?text=I%20joined%20the%20AllerLens%20waitlist%20%E2%80%94%20scan%20any%20menu%2C%20spot%20allergens%20in%20seconds.&url=https%3A%2F%2Fallerlens.app%2F%3Futm_source%3Demail%26utm_medium%3Dshare%26utm_campaign%3Dwelcome"
            >
              Share on X
            </Link>{" · "}
            <Link
              href="https://api.whatsapp.com/send?text=AllerLens%3A%20scan%20any%20menu%2C%20spot%20allergens%20in%20seconds%20%E2%80%94%20https%3A%2F%2Fallerlens.app%2F%3Futm_source%3Demail%26utm_medium%3Dshare%26utm_campaign%3Dwelcome"
            >
              WhatsApp
            </Link>{" · "}
            <Link
              href={"sms:?&body=" + encodeURIComponent("AllerLens — scan any menu, spot allergens in seconds: https://allerlens.app/?utm_source=email&utm_medium=sms_share&utm_campaign=welcome")}
            >
              Text
            </Link>
          </Text>

          <Hr style={{ borderColor: brand.border, margin: "20px 0" }} />

          <Text style={{ fontSize: 11, color: brand.sub, lineHeight: 1.5 }}>
            You’re receiving this because you joined the waitlist at allerlens.app.
            Manage preferences or unsubscribe anytime:
            {" "}
            <Link href={unsubscribeUrl}>Unsubscribe</Link>.
          </Text>

          <Text style={{ fontSize: 11, color: brand.sub }}>
            © {new Date().getFullYear()} AllerLens. This is guidance, not medical advice.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

