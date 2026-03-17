import { prisma } from "@/lib/prisma";

type SyncUserInput = {
  authId: string;
  email: string;
  fullName?: string | null;
};

export async function syncUserToDatabase({
  authId,
  email,
  fullName,
}: SyncUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      authId,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      authId,
      email,
      fullName: fullName?.trim() || "New User",
      settings: {
        create: {},
      },
    },
  });

  return newUser;
}
