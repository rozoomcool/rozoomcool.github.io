const User = require('../models').user

class UserRepo{
    async createUser(user) {
        await User.create(user)
        .catch(err => console.error("ERROR CREATE USER"))
    }

    async findById(id){
        let user = await User.findByPk(id)
            .catch(err => console.log(err))

        return user
    }

    async findByNickname(nickname){
        return await User.findOne({where: {nickname: nickname}})
            .then(user => user)
            .catch(err => console.error(err))
    }

    async updateUser(user){

        await User.update({
            nickname: user?.nickname,
            email: user?.email,
            firstname: user?.firstname,
            lastname: user?.lastname,
            age: user?.age,
            phone: user?.phone
        }, {
            where: {
              id: user.id
            }
          })
          .then((user) => {return user})
          .catch((e) => {return})
    }
}

module.exports = new UserRepo()