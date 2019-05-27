# Scheduling Appointments Application

## Functional Requirements

- The user must be able to create an account with name, email and password;
- The user must be able to authenticate in the application with email and password;
- The user must be able to change his name and password by informing the old password, the new password and the confirmation of the new password;
- The user must be able to register events in his calendar with title, location, date and time;
- The user must be able to list the events registered by date;
- The user must be able to delete an appointment;
- The User must be able to share an appointment by informing the recipient's email. Once shared, the recipient must receive all event information via email;

## Non-functional requirements

- Use SQL database;
- Use queue with Redis to schedule the sending of e-mails from the compromise share;

## Business rules

- The user's email is unique;
- The user can not change his email;
- It should not be possible to register two events at the same time in a user's calendar;
- The user can only view / edit / delete your events;
- The user can not edit / delete an event that has passed;
- All registrations must have validation of field.

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
