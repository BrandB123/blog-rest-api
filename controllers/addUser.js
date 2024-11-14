const bcrypt = require('bcryptjs');

const name = `${req.body.firstName} ${req.body.lastName}`;
if (req.body.password !== req.body.passwordConfirmation){
    res.end
} else {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        try {
            db.addUser(name, hashedPassword, req.body.username)
        } catch (err) {
            return next(err)
        }
    })
}