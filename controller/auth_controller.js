const {validationResult} = require('express-validator')
const userRepo = require('../repo/user_repo')
const bcrypt = require('bcrypt')
const {generateAccessToken} = require('../service/jwt_service')
    
    
class AuthConstroller{
    async registration (req, res) {
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({message: "validation faild", errors})
            }

            const {nickname, email, password, firstname, lastname} = req.body
            const saltRounds = 8

            const candidate = await userRepo.findByNickname(nickname)

            if(candidate){
                return res.status(400).json("user already exist")
            } else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    userRepo.createUser({
                        nickname,
                        email,
                        password: hash,
                        firstname,
                        lastname,
                        role: "STUDENT"
                    }) 

                    return res.status(200).json("registration is successful")
                })
            }
            
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Registration is faild"})
        }
    }

    async login (req, res) {
        try {
            const {nickname, password} = req.body
            const user = await userRepo.findByNickname(nickname)

            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result){

                        const token = generateAccessToken(user.id, user.role)
                        return res.status(200).json(token)

                    } else{
                        return res.status(400).json("authenticate is faild")
                    }
                })
            } else {
                return res.status(400).json("user not exist")
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "authentication is faild"})
        }
    }
}

module.exports = new AuthConstroller()