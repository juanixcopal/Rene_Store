import { instanceAPIInvitaPRO } from '../../config/data-source'

export const getEvents = async params => {
  return await instanceAPIInvitaPRO.get('/event/query', {
    params,
    headers: {
      service: 'all-events'
    }
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
