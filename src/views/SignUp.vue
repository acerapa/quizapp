<template>
  <div id="main-container">
    <div id="form-cont">this is Sign-Up</div>
  </div>
</template>

<script>
export default {
  name: "Sign-Up",
};
</script>

<style scoped>
#main-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(65, 142, 206),
    rgb(64, 128, 64)
  );
  display: grid;
  align-items: center;
  justify-items: center;
}

#form-cont {
  background-image: linear-gradient(
    to right,
    rgba(97, 160, 211, 0.6),
    rgba(78, 160, 78, 0.6)
  );
  /* border: solid 1px blue; */
  width: 600px;
  height: 550px;
  box-shadow: 0px 0px 8px rgb(106, 112, 109) rgb(106, 112, 109);
}
</style>