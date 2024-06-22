/**
 * converts date object to ISO 8601 format date string (yyyy-mm-dd)
 * @param {Date} dateObject 
 * @returns {string}
 */
const convertDateToString = (dateObject) => {
    //yyyy - mm - dd
    return `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth()+1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;
}

export {convertDateToString};