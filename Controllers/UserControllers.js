const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const axios = require('axios');

exports.login = (
    email,
    password
) => new Promise((resolve, reject) => {
    User.findOne({ 'email': email }).then(
        (user) => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    user.password = undefined;
                    resolve(user);
                }
                reject('mot de passe incorrecte');
            }
            reject('utilisateur introuvable')

        }
    ).catch(
        (error) => reject(error)
    )
});



exports.create = (
    nom,
    prenom,
    email,
    password,direction
    
) => new Promise(async (resolve, reject) => {
    if (nom === undefined) {
        return reject('Le nom est un champ obligatoire');
    }
    if (prenom === undefined) {
        return reject('Le prénom est un champ obligatoire');
    }
    if (email === undefined) {

        return reject('Le mail est un champ obligatoire');
    }
    if (password === undefined) {
        return reject('Le mot de passe est un champ obligatoire');
    }
    if (direction === undefined) {
        return reject('direction est un champ obligatoire');
    }

    await axios.get('http://apilayer.net/api/check?access_key=c997b63a4dd56e42fd1a4c581d378f6d&email=' + email + '&smtp=1&format=1')
        .then(res => {
            //console.log(res.data);
            if (res.data.smtp_check === false || res.data.format_valid === false) {
                return reject('email n\'est pas valide');
            } else 
                try {
                    const user = new User();

                    user.nom = nom;
                    user.prenom = prenom;
                    user.email = email;
                   
                    user.password = bcrypt.hashSync(password, 10);
                    user.direction=direction;

                    user.save()
                        .then(
                            async (user) => { 
                                user.password = undefined;
                                return resolve(user); }

                        ).catch(
                            (e) => reject(e.message)
                        )

                } catch (e) {
                    return reject(e);
                }
            

        })
        .catch(e => reject(e))
});
