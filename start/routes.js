'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update')
  Route.resource('events', 'EventController').apiOnly()
}).middleware('auth')
