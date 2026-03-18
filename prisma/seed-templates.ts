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
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Clean Corporate",
      slug: "clean-corporate",
      themeType: "light",
      layoutConfig: {
        style: "corporate",
        background: "light",
        accent: "#2563eb",
        cardShape: "rounded",
      },
      isPremium: false,
      isActive: true,
    },
    {
      name: "Modern Glass",
      slug: "modern-glass",
      themeType: "glass",
      layoutConfig: {
        style: "modern",
        background: "glass",
        accent: "#8b5cf6",
        cardShape: "soft",
      },
      isPremium: false,
      isActive: true,
    },
  ];

  for (const template of templates) {
    await prisma.cardTemplate.upsert({
      where: {
        slug: template.slug,
      },
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
