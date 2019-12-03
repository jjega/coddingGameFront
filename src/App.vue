<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
  .center {
    text-align: center;
  }
  .vertical-cebter-full {
    height: 100vh;
    padding-top: 50vh;
  }
  .carre {
    border: 1px solid #4C4C4C
  }
  .bg-red {
    background-color: red;
    color: #4C4C4C
  }
  .data {
    height: 100vh;
    overflow: auto;
  }
  .logout {
    margin-bottom: 20px;
  }
  .error {
    color: red;
  }
  .table-data {
    box-shadow: 5px 4px 8px 5px;
    width: 95%;
    margin-top: 20px;
  }
</style>
