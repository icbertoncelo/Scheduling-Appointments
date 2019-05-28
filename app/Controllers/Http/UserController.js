'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth: { user } }) {
    const data = request.only(['username', 'old_password', 'new_password'])

    if (data.old_password) {
      const isSame = await Hash.verify(data.old_password, user.password)

      if (!isSame) {
        return response.status(401).send({
          error: { message: 'Old Password is incorrect' }
        })
      }

      if (!data.new_password) {
        return response.status(401).send({
          error: { message: 'New password is required' }
        })
      }

      user.merge({ username: data.username, password: data.new_password })

      await user.save()

      return user
    } else {
      return response.status(401).send({ error: { message: 'No password provided' } })
    }
  }
}

module.exports = UserController
