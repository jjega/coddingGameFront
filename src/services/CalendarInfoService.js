import Api from './Api';

export default {
  addCalendarsInfo(data) {
    let query = '';
    
    if (data.calendar) {
      query += `calendar: ${data.calendar.id},`;
    }
    if (data.gladiator) {
      query += `gladiator: ${data.gladiator.id},`;
    }
    if (data.gladiator_type) {
      query += `gladiator_type: ${data.gladiator_type.id},`;
    }
    if (data.weapon) {
      query += `weapon: ${data.weapon.id}`;
    }

    return Api().post('/graphql', {query: `mutation {
      addCalendarsInfo (${query}) {
        id
        gladiator {id, email, first_name, last_name, birthdate}, 
        gladiator_type {id, label, speed, atk, def, dist_atk}, 
        weapon {id, label, speed, atk, def}
      }
    }`});
  },
  updateCalendarsInfo(data) {
    let query = '';
console.log('data',data);
    if (data.id) {
      query += `id: ${data.id},`;
    }
    if (data.calendar) {
      query += `calendar: ${data.calendar.id},`;
    }
    if (data.gladiators) {
      query += `gladiator: ${data.gladiators.id},`;
    }
    if (data.gladiator_type) {
      query += `gladiator_type: ${data.gladiator_type.id},`;
    }
    if (data.weapons) {
      query += `weapon: ${data.weapons.id}`;
    }

    return Api().post('/graphql', {query: `mutation {
      updateCalendarsInfo (${query}) {
        id
        gladiator {id, email, first_name, last_name, birthdate}, 
        gladiator_type {id, label, speed, atk, def, dist_atk}, 
        weapon {id, label, speed, atk, def}
      }
    }`});
  },
  deleteCalendarsInfo(data) {
    let query = '';

    if (data.id) {
      query = `calendar: ${data.id},`;
    }

    return Api().post('/graphql', {query: `mutation {
      deleteCalendarsInfo (${query}) {
        id
        gladiator {id, email, first_name, last_name, birthdate}, 
        gladiator_type {id, label, speed, atk, def, dist_atk}, 
        weapon {id, label, speed, atk, def}
      }
    }`});
  }
}
