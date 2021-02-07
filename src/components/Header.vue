<template>
  <div id="main-header">
    <div id="logo">
      <a href=""
        ><img src="../assets/logo1.png" id="logo" alt="company logo" srcset=""
      /></a>
    </div>
    <div id="nav-links">
      <router-link class="nav-item" to="#">Community</router-link>
      <router-link class="nav-item" to="/services">Services</router-link>
      <router-link class="nav-item" to="/about">About</router-link>
      <router-link class="nav-item" to="/sign-in">Sign in</router-link>
      <router-link class="nav-item" to="/sign-up">Sign up</router-link>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.nav-item {
  padding: 15px;
  text-decoration: none;
  color: rgb(16, 121, 16);
}

.nav-item:hover {
  color: rgb(43, 88, 250);
  border-bottom: solid 2px rgb(43, 88, 250);
}

#nav-links {
  text-align: right;
}

#logo {
  height: 70px;
  padding-left: 5px;
}

#main-header {
  height: 80px;
  background-image: linear-gradient(
    to right,
    rgb(192, 222, 248),
    rgb(201, 250, 201)
  );
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  box-shadow: 0px 0px 10px gray;
}
</style>