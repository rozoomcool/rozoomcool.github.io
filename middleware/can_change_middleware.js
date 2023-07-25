const {verifyToken} = require('../service/jwt_service')
const userRepo = require('../repo/user_repo')

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const token_data = verifyToken(token)

        if(!token){
            return res.status(403).json({message: "user has not authenticated"})
        } else {

            const user = await userRepo.findById(token.id)

            if(token_data.role === 'ADMIN' || token_data.id == user.id){
                return next()
            }
        }

        return res.status(403).json({message: "you has not access to modify this user"})

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "user has not authenticated"})
    }
}