import { useAlert } from "../../provider/alert-provider";
import { putDataEvent } from "../../data/details-event/put";

export const useActions = ({formatData, fetchDeatilsEvent, idEvent }) => {
    const showAlert = useAlert()

    const updateDataEvent = async e => {
        e.preventDefault()
        putDataEvent({ formatData, fetchDeatilsEvent, showAlert, idEvent  })
    }

    return {updateDataEvent}
}