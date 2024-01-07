import { googleClientId, googleClientSecret } from ".";
import { PassportStatic } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import { UserDoc } from "../interfaces/UserDoc";
import User from "../models/User";

export default (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: "/api/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = <UserDoc>{
          displayName: profile.displayName,
          googleId: profile.id,
          email: profile.emails?.[0].value,
          // birthDate:
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
        // console.log(profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
