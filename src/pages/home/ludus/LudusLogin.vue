<template src="./ludusLogin.page.html"></template>
<style src="./ludusLogin.page.css"></style>
<script>
import { mapState, mapActions } from "vuex";

import Login from "../../../components/login/Login";

export default {
  name: "LudusLogin",
  data() {
    return {
      type: 'ludus'
    };
  },
  components: {
    'cg-login' : Login,
  },
  methods: {
    ...mapActions("account", ["LOGIN", "LOGOUT"]),
    submitLogin(e) {
      const { username, password } = this;
      if (username && password) {
        this.LOGIN({ username, password });
      }
    }
  }
};
</script>
