import { Router } from 'express';
import passport from 'passport';

const router = Router();

//! Ver que ruta sirve
// auth login
router.get('/login', (req,res) => {
    res.render('login', {user:req.user})
})
// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
        req.logout()
        res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events']
}))

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', {successReturnToOrRedirect: '/profile',
failureRedirect: '/'}))

export default router;
