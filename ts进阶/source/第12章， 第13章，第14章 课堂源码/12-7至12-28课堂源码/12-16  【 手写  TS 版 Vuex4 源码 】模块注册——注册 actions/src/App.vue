<template>
  <div id="nav">
    <router-link to="/foodSort">美食分类</router-link> |
    <router-link to="/hotelSort">酒店分类</router-link> |
    <router-link to="/about">关于</router-link>
  </div>
  <router-view />
</template>
<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bolder;
  color: #2c3e50;
}
#nav .router-link-exact-active {
  color: #42b983;
}
</style>
