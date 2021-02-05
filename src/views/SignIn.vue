<template>
        <div id="form-container">
            <div id="form-wrapper">
                <form action="">
                    this is the actual form tag
                </form>
            </div>
        </div>
</template>

<script>
export default {
    name: "Sign-In"
}
</script>

<style scoped>
    #form-container {
        /* border: solid 1px green; */
        position: fixed;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, rgb(65, 142, 206), rgb(64, 128, 64));
        display: grid;
        justify-content: center;
        align-content: center;
    }
    #form-wrapper {
        border: solid rgb(184, 197, 190);
        border-radius: 8px;
        background-image: linear-gradient(to right, rgba(97, 160, 211, 0.6), rgba(78, 160, 78, 0.6));        
        width: 400px;
        height: 530px;
    }
</style>