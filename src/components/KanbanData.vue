<template>
  <div class="row">
    <div style="margin-right: 10px" class="col card">
      <div class="card-header">
        <h2>Backlog</h2>
      </div>
      <div class="card" v-for="item in backlog" :key="item.id">
        <h4>{{ item.title }}</h4>
        <div>
          <button class="btn btn-success" @click="choose(item.id)">Edit</button>
          <button class="btn btn-danger" @click="delTask(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <div style="margin-right: 10px" class="col card">
      <div class="card-header">
        <h2>Todo</h2>
      </div>
      <div class="card" v-for="item in todo" :key="item.id">
        <h4>{{ item.title }}</h4>
        <div>
          <button class="btn btn-success" @click="choose(item.id)">Edit</button>
          <button class="btn btn-danger" @click="delTask(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <div style="margin-right: 10px" class="col card">
      <div class="card-header">
        <h2>Doing</h2>
      </div>
      <div class="card" v-for="item in doing" :key="item.id">
        <h4>{{ item.title }}</h4>
        <div>
          <button class="btn btn-success" @click="choose(item.id)">Edit</button>
          <button class="btn btn-danger" @click="delTask(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <div style="margin-right: 10px" class="col card">
      <div class="card-header">
        <h2>Done</h2>
      </div>
      <div class="card" v-for="item in done" :key="item.id">
        <h4>{{ item.title }}</h4>
        <div>
          <button class="btn btn-success" @click="choose(item.id)">Edit</button>
          <button class="btn btn-danger" @click="delTask(item.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KanbanData",
  props: ["Tasks", 'getTask'],

  data() {
    return {};
  },
  methods: {
    choose(id) {
      console.log(id);
      this.$emit("getOne", id);
    },
    delTask(id) {
      axios({
        method: `DELETE`,
        url: `https://kanban-mine-db963.web.app/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.getTask();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    backlog: function () {
      return this.Tasks.filter((el) => {
        return el.category == "backlog";
      });
    },
    todo: function () {
      return this.Tasks.filter((el) => {
        return el.category == "todo";
      });
    },
    doing: function () {
      return this.Tasks.filter((el) => {
        return el.category == "doing";
      });
    },
    done: function () {
      return this.Tasks.filter((el) => {
        return el.category == "done";
      });
    },
  },
};
</script>

<style>
</style>