<template>
  <div id="services">
    <Header />
    <div id="services-content">
      <h4>This is services</h4>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Services",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
#services-content {
    margin-top: 100px;
}

/* #services {
  padding: 0px;
  margin: 0px;
} */
</style>