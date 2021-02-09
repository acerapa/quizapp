<template>
    <div>
        <Header></Header>
            <div id="content">
                This is the landing page
                
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
        Footer
    }
}
</script>

<style scoped>
    #content {
        margin-top: 100px;
        border: solid 1px blue;
        height: 600px;
    }
</style>