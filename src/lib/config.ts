export const config = {
    jwt: {
        secret: String(process.env.NEXT_PUBLIC_AUTH_SECRET),
    },
    google: {
        clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
        secret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET),
    },
    github: {
        clientId: String(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID),
        secret: String(process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET),
    },
    mail: {
        secure: Boolean(process.env.NEXT_PUBLIC_MAIL_SECURE),
        host: String(process.env.NEXT_PUBLIC_MAIL_HOST),
        port: Number(process.env.NEXT_PUBLIC_MAIL_PORT),
        password: String(process.env.NEXT_PUBLIC_MAIL_PASS),
        user: String(process.env.NEXT_PUBLIC_MAIL_USER),
    },
    mongodb: {
        uri: String(process.env.NEXT_PUBLIC_MONGODB_URI),
    },
    appWrite: {
        projectId: String(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID),
        apiKeySecret: String(process.env.NEXT_PUBLIC_APP_WRITE_API_KEY_SECRET),
        cloudUri: String(process.env.NEXT_PUBLIC_APP_WRITE_URL),
        usersDb: String(process.env.NEXT_PUBLIC_APP_WRITE_USERS_DB),
        imageBucket: String(process.env.NEXT_PUBLIC_APP_WRITE_IMAGES_BUCKET),
        fileBucket: String(process.env.NEXT_PUBLIC_APP_WRITE_FILES_BUCKET),
    },
    next: {
        url: String(process.env.NEXT_PUBLIC_BASE_URL),
    },
};
