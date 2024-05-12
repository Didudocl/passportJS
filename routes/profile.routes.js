import { Router } from "express";

const router = Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('auth/login');
    } else {
        // if logged in
        next();
        return;
    }
}

router.get('/', authCheck, (req,res) => {
    const nameUser = req.user.name;
    res.render('profile', {user: nameUser});
})


export default router;