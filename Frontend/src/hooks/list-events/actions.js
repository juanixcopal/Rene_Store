import { useAlert } from "../../provider/alert-provider";
import { postNewEvent } from "../../data/list-events/post";

export const useActions = ({ dataNewEvent, toggle, fetchEvents }) => {
    const showAlert = useAlert()

    const createNewEvent = async e => {
        e.preventDefault()
        postNewEvent({ dataNewEvent, toggle, fetchEvents, showAlert })
    }
    
    return { createNewEvent }
    
}