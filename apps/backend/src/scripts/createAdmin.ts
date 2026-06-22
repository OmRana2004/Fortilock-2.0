import bcrypt from "bcrypt";
import { prisma } from "../db";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@fortilock.com",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(
    "12345678",
    10
  );

  const admin = await prisma.user.create({
    data: {
      name: "Om Rana",
      email: "admin@fortilock.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Admin created:", admin.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });