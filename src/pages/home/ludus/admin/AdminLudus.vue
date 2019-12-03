<template src="./adminLudus.page.html"></template>
<style src="./adminLudus.page.css"></style>
<script>
import moment from "moment";
import GladiatorTypeService from "../../../../services/GladiatorTypeService";
import CalendarService from "../../../../services/CalendarService";
import CalendarInfoService from "../../../../services/CalendarInfoService";
import Logout from "../../../../components/logout/Logout";

export default {
  name: "AdminLudus",
  data() {
    return {
      animal_id: 5,
      message: "",
      gladiator_types: [],
      calendar: [],
      form: {
        id: 0,
        date: "",
        fight: [],
        ludis: {}
      },
      options: [{ text: "", value: "" }]
    };
  },
  components: {
    "cg-logout": Logout
  },
  computed: {
    option_checkbox: {
      get: function() {
        return this.options;
      },
      set: function(data) {
        this.options = data;
      }
    },
    calendar_data: {
      get: function() {
        return this.calendar;
      },
      set: function(datas) {
        datas.forEach(data => {
          data.date = moment(Number(data.date)).format("DD-MM-YYYY");
        });

        this.calendar = datas;
      }
    }
  },
  mounted() {
    this.getGladiatorTypes().then(getGladiatorType => {
      this.gladiator_types = getGladiatorType;
      this.option_checkbox = this.gladiator_types.map(gladiator_type => {
        return {
          text: gladiator_type.label,
          value: JSON.stringify(gladiator_type)
        };
      });
    });
    this.getCalendar().then(calendar => {
      this.calendar_data = calendar;
    });
  },
  methods: {
    getCalendar() {
      return CalendarService.getCalendars().then(response => {
        return response.data.data.getCalendars;
      });
    },
    getGladiatorTypes() {
      return GladiatorTypeService.getGladiatorTypes().then(response => {
        return response.data.data.getGladiatorType;
      });
    },
    checkForm(form) {
      const fighters = form.fight.filter(
        fight => fight.gladiator_type.id != this.animal_id
      );

      if (form.date === "" || form.date === "invalide date") {
        this.message = "Select a date";
        return false;
      } else if (fighters.length < 2) {
        this.message = "Select at least 2 fighters. Animal is not a fighter";
        return false;
      }
      this.message = "";
      return true;
    },
    onSubmit() {
      let form = { ...this.form };
      form.ludis = this.$store.getters.user;

      for(let i = 0; i<form.fight.length; i++) {
        if (form.fight[i]) {
          form.fight[i] = { gladiator_type: JSON.parse(form.fight[i]) };
        } else {
          delete form.fight[i];
        }
      }

      if (this.checkForm(form)) {
        if (form.id) {
          // UPDATE
          CalendarService.updateCalendars(form).then(calendar => {
            CalendarInfoService.deleteCalendarsInfo(
              calendar.data.data.updateCalendars
            ).then(() => {
              let calendarInfos = form.fight.map(fight => {
                fight["calendar"] = calendar.data.data.updateCalendars;

                return CalendarInfoService.addCalendarsInfo(fight);
              });

              Promise.all(calendarInfos).then(() => {
                this.getCalendar().then(calendar => {
                  this.calendar_data = calendar;
                });
              });
            });
          });
        } else {
          // CREATE
          CalendarService.addCalendars(form).then(calendar => {
            let calendarInfos = form.fight.map(fight => {
              fight["calendar"] = calendar.data.data.addCalendar;

              return CalendarInfoService.addCalendarsInfo(fight);
            });
            Promise.all(calendarInfos).then(() => {
              this.getCalendar().then(calendar => {
                this.calendar_data = calendar;
                this.form = {
                  id: 0,
                  date: "",
                  fight: [],
                  ludis: {}
                };
              });
            });
          });
        }
      }
    },
    rebuildFight(form) {
      form["fight"] = [];
      for (let [key, value] of Object.entries(form)) {
        if (key !== "id" && key !== "date") {
          let tab_gladiator_type = this.gladiator_types.filter(
            gladiator_type => gladiator_type.label === form[key]
          );
          form.fight.push(JSON.stringify(tab_gladiator_type[0]));
        }
      }

      return form;
    },
    onRowSelected(calendar) {
      this.form = { ...calendar[0] };
      if (calendar[0]) {
        let tab_lib = [this.form.Gladiator_1, this.form.Gladiator_2];
        this.form = this.rebuildFight(this.form);
        this.form.date = moment(this.form.date, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
      } else {
        this.form.fight = [];
        this.form.date = "";
      }
    },
    formatData(calendars) {
      return calendars.map(calendar => {
        if (calendar.fight) {
          for (let i = 0; i < calendar.fight.length; i++) {
            calendar[`Gladiator_${i + 1}`] =
              calendar.fight[i].gladiator_type.label;
          }
          delete calendar.fight;
        }

        return calendar;
      });
    }
  }
};
</script>
