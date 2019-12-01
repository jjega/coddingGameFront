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
        hasAnimal: false
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
      
    });
    this.getCalendar().then(calendar => {
      this.calendar_data = calendar;
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
    getGladiatorTypes() {
      return GladiatorTypeService.getGladiatorTypes().then(response => {
        return response.data.data.getGladiatorType;
      });
    },
    onRowSelected(calendar) {
      this.fight = calendar[0];
      const fighters = calendar[0].fight.map(fight => GladiatorTypeService.getGladiatorTypes(fight.gladiator_type));

      Promise.all(fighters).then(responses => {
        this.fighters = responses.map(response => response.data.data.getGladiatorType[0])
      });
    },
    convertGladiators(gladiateurs) {
      return gladiateurs.map(gladiateur => {
        return {text: `${gladiateur.first_name} ${gladiateur.last_name}`, value: gladiateur}
      })
    },
    convertWeapons(weapons) {
      return weapons.map(gladiateur => {
        return {text: `${weapons.label}}`, value: weapons}
      })
    }
  }
};
</script>
