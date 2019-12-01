<template src="./login.page.html"></template>
<style src="./login.page.css"></style>
<script>
import router from "../../router";
import EmperorService from "../../services/EmperorService";
import LudusService from "../../services/LudusService";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,
      label: ""
    };
  },
  props: ["type"],
  created: function() {
    const { isAuth, type } = this.$store.getters;

    if (isAuth) {
      if (type === 'emperor') {
        router.push({ name: 'AdminEmperor' });
      } else {
        router.push({ name: 'AdminLudus' });
      }
    }
  },
  methods: {
    onSubmit() {
      const { type, form }  = this;
      
      switch (type) {
        case 'emperor':
          EmperorService.login(form)
          .then(response => {
            const emperor = response.data.data.getEmperors[0];

            this.$store.dispatch('LOGIN_EMPEROR', emperor);
            router.push({ name: 'AdminEmperor' });
          });
          break;
        case 'ludus':
          LudusService.login(form)
          .then(response => {
            const ludus = response.data.data.getLudis[0];
            
            this.$store.dispatch('LOGIN_LUDUS', ludus);
            router.push({ name: 'AdminLudus' });
          });
          break;
      }
      
    },
    onReset(evt) {
      evt.preventDefaudlt();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
