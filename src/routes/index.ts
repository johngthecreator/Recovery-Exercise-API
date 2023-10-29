import express, { Express, Request, Response } from 'express';
import {exercises} from "./exerciseRoutes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};
import passport from 'passport';
import session from 'express-session';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

const app: Express = express();

const testUsers = [
    { token: 1 , username: 'alice', password: 'password123' },
    { token: 2, username: 'bob', password: 'secret' }
];

app.use(session({
    secret: process.env.CLIENT_SECRET, // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set this to true if you're using HTTPS
}));

passport.use(new OAuth2Strategy({
    authorizationURL: process.env.AUTH_URL!,
    tokenURL: process.env.TOKEN_URL!,
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.REDIRECT_URI!,
    scope: ['email', 'profile']
  },
  (token, email, refreshToken, profile, cb) => {
    // In a real-world application, you might store the user profile and token in a database.
    return cb(null, { token, profile, email, refreshToken });
  }));

const port = 3000;


app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.token);  // Here, 'user.id' is used as an example. You can choose appropriate user identifier.
});

passport.deserializeUser((token, done) => {
    const user = testUsers.find(user => user.token === token);
    
    if (user) {
        done(null, user); // If found, return the user
    } else {
        done(new Error("User not found!"), false); // If not found, return an error
    }
});


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({status:"Running", message:" Welcome to the Recovery Exercise API!"})
})

app.get('/auth',
  passport.authenticate('oauth2'));

app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.use("/exercises", exercises);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});