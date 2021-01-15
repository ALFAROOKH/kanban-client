<template>
  <div class="text-dark card" style="margin-left: 316px; max-width: 500px">
    <div class="card-header">
      <h2>Sign In</h2>
    </div>
    <form @submit.prevent="login">
      <div>
        <label for="SIemail">Email address:</label>
        <input
          type="email"
          id="SIemail"
          required
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div>
        <label for="SIpassword">Password:</label>
        <input
          type="password"
          id="SIpassword"
          required
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div>
        <button class="btn btn-success" type="submit">Sign In</button>
      </div>
    </form>
    <div>
      <button
        style="margin-top: 5px"
        class="btn btn-primary"
        @click="show('register')"
      >
        Don't have an Account?</button
      ><br />
      <p style="margin-top: 12px">or login with</p>
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      <div>
        <button  v-google-signin-button="clientId" class="google-signin-button">
          Google
        </button>
      </div>
      <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">login</GoogleLogin>    </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  name: "LoginForm",
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      email: "",
      password: "",
      temp: "",
      client_id:
        "241358849932-gjio95fkvnsmsvcan093fcthpspb5n8a.apps.googleusercontent.com",
    };
  },
  props: ["getTask", "show", "onSignIn"],
  methods: {
    clientId(id) {
      axios({
        method: `POST`,
        url: `https://kanban-mine-db963.web.app/google`,
        data: {
          id_token: id,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      // console.log(idToken);
      this.ClientId(idToken)
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    login() {
      axios({
        method: `POST`,
        url: `https://kanban-mine-db963.web.app/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          this.email = "";
          this.password = "";
          localStorage.setItem("access_token", response.data.access_token);
          this.getTask();
          this.show("kanban");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>