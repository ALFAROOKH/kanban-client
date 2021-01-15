<template>
  <div>
    <nav>
      <div>
        <h1>KANBAN</h1>
      </div>
      <div>
        <button v-if="page == 'kanban'" class="btn btn-danger" @click="logout">
          Logout
        </button>
      </div>
    </nav>

    <kanban-table
      :Tasks="tasks"
      v-if="page == 'kanban'"
      :getTask="getTask"
      :show="show"
    ></kanban-table>

    <register-form v-else-if="page == 'register'" :show="show"></register-form>

    <login-form
      v-else-if="page == 'login'"
      :show="show"
      :getTask="getTask"
    ></login-form>
  </div>
</template>

<script>
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import KanbanTable from "./components/KanbanTable";

export default {
  name: "App",
  data() {
    return {
      msg: "alohaa!!",
      page: "login",
      tasks: [],
    };
  },
  components: {
    LoginForm,
    RegisterForm,
    KanbanTable,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.show("login");
    },
    add() {
        this.page = 'kanban'
    },
    getTask() {
      axios({
        method: "GET",
        url: `https://kanban-mine-db963.web.app/task`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    show(page) {
      this.page = page;
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.page = "kanban";
      this.getTask();
    } else {
      this.page = "login";
    }
  },
};
</script>

<style>
</style>