<template>
  <div id="main-container">
    <div id="form-cont">
      <h3>Create Account</h3>
      <span>Choose account type: </span>
      <div id="choice-wrapper">
        <div class="choice-cont">
          <div class="choice-header teacher">
            <h4>Teacher</h4>
          </div>
          <ul class="abilities">
            <li class="ability">Create's the exam</li>
            <li class="ability">View the students progress</li>
            <li class="ability">View Exam results</li>
            <li class="ability">Disable an exam</li>
          </ul>

          <button class="next teacher">Teacher</button>
        </div>
        <div class="choice-cont">
          <div class="choice-header student">
            <h4>Student</h4>
          </div>
          <ul class="abilities">
            <li class="ability">Join an exam</li>
            <li class="ability">Take an exam</li>
            <li class="ability">View exam results</li>
            <li class="ability">Delete exam results</li>
          </ul>
          <button class="next student">Student</button>
        </div>
        <span id="form-footer"
          >Already have an account?
          <router-link to="/sign-in">Sign in here!</router-link></span
        >
      </div>
    </div>
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
  border-radius: 10px;
}

#choice-wrapper {
  /* border: solid 1px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 460px;
  align-content: center;
}

.choice-cont {
  /* border: solid 1px red; */
  margin: 0px 20px;
  height: 350px;
  box-shadow: 0px 0px 8px rgb(106, 112, 109) rgb(106, 112, 109);
  border-radius: 5px;
  background-color: rgb(225, 225, 225, 0.5);
}

#form-footer {
  padding: 12px;
  text-align: center;
  grid-column: 1 / span 2;
}

.choice-header {
  /* border: solid 1px; */
  border: solid rgb(91, 117, 99) 1px;
}

.teacher {
  background-color: rgb(65, 142, 206);
}

.student {
  background-color: rgb(64, 128, 64);
}

.abilities {
  text-align: left !important;
}

.ability {
  padding: 10px 0px;
}

.next {
  outline: none;
  width: 80%;
  height: 40px;
  border-radius: 20px;
  border: none;
  box-shadow: 5px 0px 10px gray;
  cursor: pointer;
  /* color: white; */
}
.next:hover {
  color: white;
  opacity: 0.5;
}


@media screen and (max-width: 400px) {
  #form-cont {
    width: 95%;
    height: 100%;
    overflow: scroll;
  }

  .choice-cont {
    display: block;
    margin: 10px 0px;
  }

  #choice-wrapper {
    display: block;
  }
}
</style>