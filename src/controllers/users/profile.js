const db = require('../../database/models');

module.exports = (req,res) => {
    // findByPk busca el id
    
    db.User.findByPk(req.session.userLogin.id,{
        include:['addressApi']  
    })
        .then(user => {
            console.log(user, "*************************");
            const birthday = user.birthday ? new Date(user.birthday).toISOString() : null;  
            return res.render('profile', {
                ...user.dataValues,
                birthday : birthday ? birthday.split('T')[0] : null
            })
        })
        .catch(error => console.log(error))
}
