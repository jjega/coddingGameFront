import Api from './Api';

export default {
  getGladiatorTypes(filter) {
    try {
      let query = '';
      let field = '';


      if (filter){
        query = `(id: "${filter.id}") `;
        field = 'gladiators {id first_name last_name} weapons {id label}'
      }
      
      return Api().post('/graphql', {query: `query {
        getGladiatorType ${query} {
          id
          label
          speed
          atk
          def
          dist_atk
          ${field}
        }
      }`});
    } catch (error) {
      console.log('GladiatorTypeService', error);
    }
      
  }
}
