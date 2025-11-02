import { instanceAPIInvitaPRO } from "../../config/data-source";

export const putDataEvent = async({ formatData, fetchDeatilsEvent, showAlert, idEvent }) => {
    const {_getDetailsEvent} = fetchDeatilsEvent
    await instanceAPIInvitaPRO
    .put(`/event/manager/${idEvent}`, formatData(), {
      headers: { service: 'update-data-event' }
    })
    .then(({ data }) => {
      if (data.result) {
        showAlert(data.message, 'success')
        _getDetailsEvent && _getDetailsEvent()
      } else {
        showAlert(data.message, 'warning')
      }
    })
    .catch(() => {
        showAlert('Error interno, puede informar este error al Departamento de Sistemas!', 'warning')
    })

}