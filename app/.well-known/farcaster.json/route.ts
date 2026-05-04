export async function GET() {
  const appUrl = process.env.APP_URL || 'https://base-royal-casino.vercel.app';
  
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
      payload: "eyJkb21haW4iOiJiYXNlLXJveWFsLWNhc2luby52ZXJjZWwuYXBwIn0",
      signature: "MHgwMDAw...fake_signature_for_demo..."
    },
    miniapp: {
      version: "1",
      name: "Base Royal Casino",
      homeUrl: appUrl,
      iconUrl: `${appUrl}/icon.png`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#0a0a0a",
      subtitle: "High-stakes Onchain Gaming",
      description: "Play casino games directly on Base chain with instant payouts.",
      primaryCategory: "games",
      tags: ["gaming", "base", "casino", "onchain"]
    }
  };

  return Response.json(manifest);
}
