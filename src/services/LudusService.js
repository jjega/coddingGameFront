import Api from './Api';

export default {
  login(loginInfo) {
    try {
      const { email, password } = loginInfo;
      // return Api().post('/graphql', loginInfo);
      return Api().post('/graphql', {query: `query {
        getLudis(email: "${email}", password: "${password}") {
          id
          email
          label
          ludus_name
          ludus_fistname
          token
          empire
        }
      }`});
    } catch (error) {
      console.log('ErrorEmperorService', error);
    }
      
  }
}
