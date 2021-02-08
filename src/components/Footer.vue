<template>
  <div id="footer" v-bind:style="styleObject">
    <div class="footer-item">
      <div id="logo-cont">
        <img src="../assets/logo1.png" id="logo" />
        <span>Quizzone</span>
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
        top: `${screen.height - 150}px`,
      },
    };
  },
};
</script>

<style scoped>
#logo-cont {
  border: solid green 1px;
}

#logo {
  width: 100px;
  height: 100px;
}

.footer-item {
  border: solid white 1px;
  margin: 12px;
  text-align: center;
}

#footer {
  /* border: solid blue 1px; */
  width: 100%;
  position: relative;
  height: 200px;
  background-color: rgb(29, 29, 70);
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>