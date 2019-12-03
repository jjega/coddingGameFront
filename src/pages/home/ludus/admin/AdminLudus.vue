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
          value: { gladiator_type }
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
    onSubmit() {
      let { form } = this;
      form.ludis = this.$store.getters.user;

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
          Promise.all(calendarInfos)
            .then(calendarInfo => {
              console.log(calendar.data.data.addCalendar);
            })
            .then(() => {
              this.getCalendar().then(calendar => {
                this.calendar_data = calendar;
              });
            });
        });
      }
    },
    onRowSelected(calendar) {
      console.log(calendar);
      this.form = { ...calendar[0] };

      this.form.fight = [];
      this.form.date = moment(this.form.date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    },
    formatData(calendars) {
      return calendars.map(calendar => {
        if (calendar.fight) {
          for (let i = 0; i < calendar.fight.length; i++) {
            console.log(i);
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
