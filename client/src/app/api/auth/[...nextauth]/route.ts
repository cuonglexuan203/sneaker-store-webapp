import NextAuth , {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
        })
    ],
    pages:{
        signIn: "/auth/signin",
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};