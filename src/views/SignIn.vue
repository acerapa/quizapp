<template>
  <div id="form-container">
    <div id="form-wrapper">
      <form action>
        <div id="logo-cont">
          <img id="logo-img" src="../assets/logo.png" alt />
          <h3>Quizzone</h3>
          <div id="input-cont">
            <input type="text" class="input-field" placeholder="Email or username" />
            <br />
            <input type="password" class="input-field" placeholder="Password" />

            <input type="submit" id="submit" value="Sign in" />
          </div>
        </div>
      </form>
      <br>
      <br>
      Haven't joined yet? <router-link to="/sign-up">Sign up here!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sign-In",
};
</script>

<style scoped>
#form-container {
  /* border: solid 1px green; */
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(65, 142, 206),
    rgb(64, 128, 64)
  );
  display: grid;
  justify-content: center;
  align-content: center;
}
#form-wrapper {
  /* border: solid 1px rgb(106, 112, 109); */
  box-shadow: 0px 0px 8px rgb(106, 112, 109) rgb(106, 112, 109);
  border-radius: 8px;
  background-image: linear-gradient(
    to right,
    rgba(97, 160, 211, 0.6),
    rgba(78, 160, 78, 0.6)
  );
  width: 400px;
  height: 530px;
}

@media only screen and (max-width: 400px) {
  #form-wrapper {
    width: 95%;
  }
}

#logo-cont {
  margin-top: 50px;
}

#logo-img {
  width: 100px;
  height: 100px;
}

#input-cont {
  margin-top: 80px;
  /* border: solid black 1px; */
}

.input-field {
  width: 80%;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: 10px;
  text-align: center;
  border: white 0.5px solid;
}

.input-field:focus {
  border: rgb(92, 187, 139) solid 0.5px;
  outline: none;
}

#submit {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin-top: 10px;
  outline: none;
  background-image: linear-gradient(
    to right,
    rgb(124, 175, 171),
    rgb(17, 107, 182)
  );
  color: white;
  cursor: pointer;
}

#submit:hover {
   background-image: linear-gradient(
    to right,
    rgb(124, 175, 171, 0.5),
    rgb(17, 107, 182, 0.5)
  );
}
</style>