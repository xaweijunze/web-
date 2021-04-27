<template>
  <div id="app">
    <p>导航：
      <router-link to="/Hello">你好世界</router-link>
      <router-link to="/HelloChild">Hello的孩子</router-link>
      <router-link to="/HelloChildChild">Hello的孙子</router-link>
    </p>
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
