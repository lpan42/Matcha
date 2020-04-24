import moment from 'moment';

const calculateAge = (date) => {
    return moment().diff(date,'years');
}

export default calculateAge;
