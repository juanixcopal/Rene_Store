import { instanceAPIInvitaPRO } from "../../config/data-source";

export const postNewEvent = async ({dataNewEvent, toggle, fetchEvents, showAlert}) => {
    const {_getEvents} = fetchEvents

    await instanceAPIInvitaPRO
    .post('/event/manager', dataNewEvent, {
      headers: { service: 'create-event' }
    })
    .then(({ data }) => {
      if (data.result) {
        showAlert(data.message, 'success')
        _getEvents && _getEvents()
        toggle && toggle()
      } else {
        showAlert(data.message, 'warning')
      }
    })
    .catch(() => {
        showAlert('Error interno, puede informar este error al Departamento de Sistemas!', 'warning')
    })

}