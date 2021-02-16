<template>
  <div id="footer" v-bind:style="styleObject">
    <div class="footer-item">
      <div id="logo-cont">
        <img src="../assets/logo1.png" id="logo" />
      </div>
    </div>
    <div class="footer-item"></div>
  </div>
</template>


<script>
export default {
  name: "Footer",
  data() {
    return {
      styleObject: {
        top: `${screen.height - 330}px`,
      },
    };
  },
};
</script>

<style scoped>
#logo-cont {
  /* border: solid green 1px; */
  padding: 5px;
}

#logo {
  height: 100px;
}

.footer-item {
  border: solid rgb(41, 2, 2) 1px;
  margin: 12px;
  text-align: center;
  border-radius: 5px;
}

#footer {
  /* border: solid white; */
  width: 100%;
  position: relative;
  height: 200px;
  background-color: rgb(110, 110, 110);
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>