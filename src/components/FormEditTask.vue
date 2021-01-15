<template>
  <div class="text-dark card" style="margin-left: 316px; max-width: 500px">
    <div class="card-header">
      <h2>Edit Task</h2>
    </div>
    <form @submit.prevent="edit(editTask.id)">
      <div>
        <label for="title">Title:</label>
        <input v-model="editTask.title" type="text" id="title" required />
      </div>
      <div>
        <label for="title">Category:</label>
        <select v-model="editTask.category" class="form-select" aria-label="Default select example" required>
          <option value="backlog" >Backlog</option>
          <option value="todo" >Todo</option>
          <option value="doing" >Doing</option>
          <option value="done" >Done</option> 
        </select>
      </div>

      <div style="margin-top: 5px">
        <button class="btn btn-success" type="submit">Edit</button>
        <button class="btn btn-danger" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  props: ["editTask", "change", "getTask", "show"],
  methods: {
    cancel() {
      this.change("kanban");
    },
    edit(id) {
      axios({
        method: `PUT`,
        url: `https://kanban-mine-db963.web.app/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.editTask.title,
          category: this.editTask.category,
        },
      })
        .then(({ data }) => {
          this.getTask();
          this.show("kanban");
          this.change("kanban");
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