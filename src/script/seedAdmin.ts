import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    // check user exist in db or not
    const adminData = {
      name: "almain patary",
      email: "hasan134@gmail.com",
      role: UserRole.ADMIN,
      password: "admin123",
      
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    // throw error here
    if (existingUser) {
      throw new Error("User already exist!!");
    }

    // signUp a now admin
    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(adminData),
      },
    );
    console.log(signUpAdmin);
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
