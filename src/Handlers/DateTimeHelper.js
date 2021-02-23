import moment from "moment";

export const formatDateTime = (date) => {
    if (date != null) {
        return moment(date).format('YYYY/MM/DD HH:mm')
    }

    return ''
}