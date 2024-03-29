export const port = process.env.PORT || 5001;
export const mongoUri = process.env.MONGO_URI;
export const jwtSecret: string = process.env.JWT_SECRET || "";
export const jwtLifetime = process.env.JWT_LIFETIME;
export const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
export const sessionSecret = process.env.SESSION_SECRET || ""
