import Api from './Api';

export default {
  getCalendars(filter) {
    try {
      let query = '';

      if (filter){
        query = `(id: "${filter.id}") `;
      }
      
      return Api().post('/graphql', {query: `query {
        getCalendars ${query} {
          id
          date
          fight {
            id
            gladiator_type {id, label, speed, def, dist_atk}
          }
        }
      }`});
    } catch (error) {
      console.log('GladiatorTypeService', error);
    }
      
  },
  addCalendars(data) {
    const { ludis, date } = data;
    const { id } = ludis;

    return Api().post('/graphql', {query: `mutation {
      addCalendar (ludi: "${id}", date: "${date}") {
        id
        date
      }
    }`});
  },
  updateCalendars(data) {
    const { id, date } = data;

    return Api().post('/graphql', {query: `mutation {
      updateCalendars (id: "${id}", date: "${date}") {
        id
        date
      }
    }`});
  }
}
