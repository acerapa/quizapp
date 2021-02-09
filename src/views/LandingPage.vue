<template>
  <div>
    <Header></Header>
    <div id="content">
      <div class="lp-item">
        <div id="lp-msg-wrapper" v-bind:style="styleObject">
          <h1>Create Quizzes Online For your students, participants</h1>
          <p>Provides a handy quizzes online</p>
        </div>
      </div>
      <div class="lp-item" id="lp-img">
          image here
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Landing Page",
  components: {
    Header,
    Footer,
  },
  data() {
      return  {
          styleObject: {
              margin: `${screen.height/4}px`
          }
      }
  }
};
</script>

<style scoped>
#content {
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

/* .lp-item {
  border: blue solid 1px;
} */

#lp-msg-wrapper {
    margin: 130px;
    width: 400px;
}

#lp-img {
    width: auto;
}
</style>