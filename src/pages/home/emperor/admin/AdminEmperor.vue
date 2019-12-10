<template src="./adminEmperor.page.html"></template>
<style src="./adminEmperor.page.css"></style>
<script>
import moment from "moment";
import GladiatorTypeService from "../../../../services/GladiatorTypeService";
import CalendarService from "../../../../services/CalendarService";
import CalendarInfoService from "../../../../services/CalendarInfoService";
import Logout from "../../../../components/logout/Logout";

export default {
  name: "AdminEmperor",
  data() {
    return {
      fight: {},
      fighters: [],
      gladiator_types: [],
      calendar: [],
      form: {
        id: 0,
        date: "",
        fight: [],
        ludis: {},
      },
      options: [{ text: "", value: "" }]
    };
  },
  components: {
    "cg-logout": Logout
  },
  computed: {
    calendarData: {
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
    this.getCalendar().then(calendar => {
      this.calendarData = calendar;
    });
  },
  methods: {
    onSubmit() {
      const { fight } = this;
      const fights = fight.fight.map((fight => CalendarInfoService.updateCalendarsInfo(fight)));
      Promise.all(fights);
      
    },
    getCalendar() {
      return CalendarService.getCalendars().then(response => {
        return response.data.data.getCalendars;
      });
    },
    onRowSelected(calendar) {
      this.fight = this.calendarData.filter((fight) => fight.id === calendar[0].id)[0];
      const fighters = this.fight.fight.map(fight => GladiatorTypeService.getGladiatorTypes(fight.gladiator_type));

      Promise.all(fighters).then(responses => {
        this.fighters = responses.map(response => response.data.data.getGladiatorType[0])
      });
    },
    convertGladiators(gladiateurs) {
      return gladiateurs.map(gladiateur => {
        const {first_name, last_name} = gladiateur;
        return {text: `${first_name} ${last_name}`, value: gladiateur}
      })
    },
    convertWeapons(weapons) {
      return weapons.map(weapon => {
        return {text: `${weapon.label}`, value: weapon}
      })
    },
    formatData(calendars) {
      return calendars.map(calendar => {
        let data = {...calendar}
        if (data.fight) {
          for (let i = 0; i < data.fight.length; i++) {
            data[`Type ${i + 1}`] = data.fight[i].gladiator_type.label;
          }
          delete data.fight;
        }

        return data;
      });
    }
  }
};
</script>
