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
    onRowSelected(calendar) {
      const fighters = calendar[0].fight.map(fight => GladiatorTypeService.getGladiatorTypes(fight.gladiator_type));

      Promise.all(fighters).then(responses => {
        this.fighters = responses.map(response => response.data.data.getGladiatorType[0])
      });
    }
  }
};
</script>
