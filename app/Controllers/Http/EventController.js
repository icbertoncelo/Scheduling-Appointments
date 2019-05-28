'use strict'

class EventController {
  async index ({ request, response, view }) {}
  async store ({ request, response }) {}
  async show ({ params, request, response, view }) {}
  async destroy ({ params, request, response }) {}
}

module.exports = EventController
