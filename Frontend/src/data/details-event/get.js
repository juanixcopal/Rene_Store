import { instanceAPIInvitaPRO } from '../../config/data-source'

export const getDetailsEvent = async ({ idEvent }) => {
  return await instanceAPIInvitaPRO
    .get(`/event/query/${idEvent}`, {
      headers: {
        service: 'event-data'
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export const getTypeEvent = async () => {
  return await instanceAPIInvitaPRO
    .get('/type-event/query', {
      headers: {
        service: 'all-type-event'
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}

export const getHall = async () => {
  return await instanceAPIInvitaPRO
    .get('/hall/query', {
      headers: {
        service: 'all-hall'
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}
