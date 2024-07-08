<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
* {
  margin: 0px;
  list-style: none;
}

#app {
  width: 100vw;
  height: 100vh;
}

html,
body {
  height: 100%;
  overflow: auto;
  margin: 0;
}

html {
  overflow-y: auto;
}
</style>
