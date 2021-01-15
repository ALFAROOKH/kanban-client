<template>
  <div class="card" style="margin-left: 316px; max-width: 500px">
    <div class="card-header">
      <h2>Sign Up</h2>
    </div>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input
          v-model="username"
          type="text"
          id="SUusername"
          required
          placeholder="Username"
        />
      </div>
      <div>
        <label for="email">Email address:</label>
        <input
          v-model="email"
          type="email"
          id="SUemail"
          required
          placeholder="Enter email"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          id="SUpassword"
          placeholder="Password"
          required
        />
      </div>
      <div>
        <button type="submit" class="btn btn-success" id="btn-signup">
          Sign Up
        </button>
      </div>
    </form>
    <div>
      <button
        style="margin-top: 5px"
        class="btn btn-primary"
        @click="show('login')"
      >
        I have an Account
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  props: ["show"],
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      axios({
        method: `POST`,
        url: `https://kanban-mine-db963.web.app/register`,
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          this.username = "";
          this.email = "";
          this.password = "";
          this.show("login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>