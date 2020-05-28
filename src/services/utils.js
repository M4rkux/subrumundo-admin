import 'moment/locale/pt-br';
import moment from 'moment';


const utils = {};

utils.formatDate = (date) => {
    const newDate = moment(date);
    if (newDate.isValid()) {
        return newDate.format('LL');
    }
    return '';
};

export default utils;