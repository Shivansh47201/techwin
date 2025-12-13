import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const allowedEmail = process.env.ADMIN_EMAIL;
        const allowedUsername = process.env.ADMIN_USERNAME;
        const allowedPassword = process.env.ADMIN_PASSWORD;

        const id = credentials?.identifier;
        const pw = credentials?.password;

        if (!id || !pw) return null;

        // allow either email or username match
        const isMatch =
          (allowedEmail && id === allowedEmail) ||
          (allowedUsername && id === allowedUsername);

        if (isMatch && pw === allowedPassword) {
          return { id: "admin", name: "Admin", email: allowedEmail || allowedUsername };
        }

        return null;
      },
    }),
  ],

  pages: { signIn: "/admin/login" },

  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
