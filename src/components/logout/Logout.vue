<template src="./logout.page.html"></template>
<style src="./logout.page.css"></style>
<script>
import router from "../../router";
import EmperorService from "../../services/EmperorService";
import LudusService from "../../services/LudusService";

export default {
  name: "Logout",
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$store.dispatch('LOGOUT');

      router.push({ name: 'Home' });
    }
  }
};
</script>
