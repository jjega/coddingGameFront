<template src="./emperorLogin.page.html"></template>
<style src="./emperorLogin.page.css"></style>
<script>
import Login from "../../../components/login/Login";

export default {
  name: "EmperorLogin",
  data() {
    return {
      type: 'emperor'
    };
  },
  components: {
    'cg-login' : Login,
  },
  methods: {
    submitLogin(e) {
      const { username, password } = this;
      if (username && password) {
        this.LOGIN({ username, password });
      }
    }
  }
};
</script>
