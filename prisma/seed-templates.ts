import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const templates = [
    {
      name: "Executive Dark",
      slug: "executive-dark",
      themeType: "dark",
      layoutConfig: {
        style: "executive",
        background: "dark",
        accent: "#36c1bf",
        text: "#ffffff",
        surface: "#0f172a",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Corporate Wave Blue",
      slug: "corporate-wave-blue",
      themeType: "light",
      layoutConfig: {
        style: "wave",
        background: "light",
        accent: "#0f4fa8",
        text: "#0f172a",
        surface: "#ffffff",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Crimson Arc",
      slug: "crimson-arc",
      themeType: "light",
      layoutConfig: {
        style: "arc",
        background: "light",
        accent: "#dc2626",
        text: "#111827",
        surface: "#ffffff",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Minimal White Editorial",
      slug: "minimal-white-editorial",
      themeType: "minimal",
      layoutConfig: {
        style: "minimal",
        background: "white",
        accent: "#111827",
        text: "#111111",
        surface: "#ffffff",
        cardShape: "sharp",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Split Contrast",
      slug: "split-contrast",
      themeType: "contrast",
      layoutConfig: {
        style: "split",
        background: "contrast",
        accent: "#111111",
        text: "#ffffff",
        surface: "#f8fafc",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Glass Frost",
      slug: "glass-frost",
      themeType: "glass",
      layoutConfig: {
        style: "glass",
        background: "frost",
        accent: "#8b5cf6",
        text: "#111827",
        surface: "rgba(255,255,255,0.65)",
        cardShape: "soft",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Tech Grid Neon",
      slug: "tech-grid-neon",
      themeType: "dark",
      layoutConfig: {
        style: "tech",
        background: "grid",
        accent: "#22d3ee",
        text: "#e2e8f0",
        surface: "#020617",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Official Clean",
      slug: "official-clean",
      themeType: "light",
      layoutConfig: {
        style: "official",
        background: "clean",
        accent: "#1d4ed8",
        text: "#0f172a",
        surface: "#ffffff",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
  ];

  for (const template of templates) {
    await prisma.cardTemplate.upsert({
      where: { slug: template.slug },
      update: {
        name: template.name,
        themeType: template.themeType,
        layoutConfig: template.layoutConfig,
        isPremium: template.isPremium,
        isActive: template.isActive,
      },
      create: template,
    });
  }

  console.log("Templates seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
