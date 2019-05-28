'use strict'

const Event = use('App/Models/Event')
const moment = require('moment')

class EventController {
  async index ({ request }) {
    const { page, date } = request.get()

    let query = Event.query().with('user')

    if (date) {
      query = query.whereRaw(`"when"::date = ?`, date)
    }

    const events = await query.paginate(page)

    return events
  }

  async store ({ request, response, auth: { user } }) {
    const data = request.only(['title', 'where', 'when'])

    try {
      const event = await Event.findByOrFail('when', data.when)
      if (event) {
        return response.status(401).send({
          error: { message: 'Impossible to schedule two events in the same date' }
        })
      }
    } catch (err) {
      const event = await Event.create({ ...data, user_id: user.id })
      return event
    }
  }

  async show ({ params, response, auth: { user } }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== user.id) {
      return response.status(401).send({
        error: { message: 'You can not see it' }
      })
    }

    return event
  }

  async update ({ request, response, params, auth: { user } }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== user.id) {
      return response.status(401).send({
        error: { message: 'You can not update it' }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: { message: 'You can not update passed events' }
      })
    }

    const data = request.only(['title', 'where', 'when'])

    try {
      const event = await Event.findByOrFail('when', data.when)
      if (event.id !== Number(params.id)) {
        return response.status(401).send({
          error: { message: 'Impossible to schedule two events in the same date' }
        })
      }
    } catch (err) {}

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params, response, auth: { user } }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== user.id) {
      return response.status(401).send({
        error: { message: 'You can not delete it' }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: {
          message: 'You can not delet passed events'
        }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
