<template>
    <div class="container">
      <AddUserComponent/>
      <ItemComponent/>
      <DashboardComponent/>
    </div>
</template>

<script>
import AddUserComponent from './components/AddUserComponent.vue'
import ItemComponent from './components/ItemComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue'

export default {
  
  name: 'App',
  components: {
    AddUserComponent,
    ItemComponent,
    DashboardComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
