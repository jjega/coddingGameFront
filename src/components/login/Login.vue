<template src="./login.page.html"></template>
<style src="./login.page.css"></style>
<script>
import router from "../../router";
import EmperorService from "../../services/EmperorService";

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
  created() {
    // if allready connected redirect to Home
    router;
  },
  methods: {
    onSubmit() {
      const { type }  = this;
      
      switch (type) {
        case 'emperor':
          EmperorService.login(this.form)
          .then(emperor => {
            console.log(emperor);
          });
          break;
        case 'ludus':
          LudusService.login(this.form)
          .then(ludus => {
            console.log(ludus);
          });
          break;
      }


      // const emperor = await EmperorService.login(this.form);

      //this.$store.dispatch('');
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
