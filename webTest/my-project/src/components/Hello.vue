<template>
  <div class="hello">
    <router-link to="/">首页</router-link>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      msg: 'hello world',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

</style>
