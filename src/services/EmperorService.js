import Api from './Api';

export default {
  login(loginInfo) {
    try {
      const { email, password } = loginInfo;
      
      return Api().post('/graphql', {query: `query {
        getEmperors(email: "${email}", password: "${password}") {
          id
          email
          birthdate
          first_name
          last_name
          birthdate
          token
        }
      }`});
    } catch (error) {
      console.log('ErrorEmperorService', error);
    }
      
  }
}
