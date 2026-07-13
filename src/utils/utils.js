/**
 * converts date object to ISO 8601 format date string (yyyy-mm-dd)
 * @param {Date} dateObject 
 * @returns {string}
 */
export function convertDateToString(dateObject) {
    //yyyy - mm - dd
    return `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth()+1)).slice(-2)}-${('0' + dateObject.getDate()).slice(-2)}`;
}


/**
 * Returns dummy project data
 * @returns {Array}
 */
export function dummyProject(){
  return [
      {
        projectId: 'project0',
        projectName: 'Demo Project 1',
        description: 'Demo project of the highest order',
        dueDate: '2024-11-2',
        tasks: [
          'work on task a to c',
          'refer to task g for f'
        ]
      },
      {
        projectId: 'project1',
        projectName: 'Demo Projec 2',
        description: 'Demo project of the second highest order',
        dueDate: '2024-1-15',
        tasks: [
          'work on task alpha to zeta',
          'refer to task mu for omega'
        ]
      }
  ]
}