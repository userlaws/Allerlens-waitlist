import {
  Html, Head, Preview, Body, Container, Img, Section,
  Text, Button
} from "@react-email/components";

const brand = {
  green: "#16a34a",
  text: "#0f172a",
  sub: "#475569",
  border: "#e2e8f0",
};

export default function ConfirmWaitlist({ confirmUrl }: { confirmUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your AllerLens sign-up</Preview>
      <Body style={{ background: "#ffffff", fontFamily: "Inter, Arial, sans-serif", color: brand.text }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "24px" }}>
          <Section style={{ textAlign: "center", marginTop: 4, marginBottom: 24 }}>
            <Img 
              src="https://allerlens.app/icon.png" 
              alt="AllerLens" 
              width="80" 
              height="103" 
              style={{ margin: "0 auto", display: "block" }} 
            />
          </Section>

          <Text style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px", textAlign: "center" }}>
            Confirm your sign-up
          </Text>

          <Text style={{ fontSize: 16, color: brand.sub, margin: "0 0 24px", textAlign: "center", lineHeight: 1.6 }}>
            Hi — please confirm you want waitlist updates for AllerLens. Click the button below to secure your spot.
          </Text>

          <Section style={{ textAlign: "center", marginBottom: 24 }}>
            <Button
              href={confirmUrl}
              style={{
                background: brand.green,
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block",
                fontSize: 16
              }}
            >
              Confirm Email
            </Button>
          </Section>

          <Text style={{ fontSize: 14, color: brand.sub, margin: "0 0 8px", textAlign: "center" }}>
            Or copy and paste this link into your browser:
          </Text>
          <Text style={{ fontSize: 12, color: brand.sub, margin: "0 0 24px", textAlign: "center", wordBreak: "break-all" }}>
            {confirmUrl}
          </Text>

          <Text style={{ fontSize: 12, color: brand.sub, margin: "24px 0 0", textAlign: "center", lineHeight: 1.5 }}>
            If you didn't request this, you can safely ignore this email.
          </Text>

          <Text style={{ fontSize: 11, color: brand.sub, margin: "24px 0 0", textAlign: "center" }}>
            © {new Date().getFullYear()} AllerLens
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

