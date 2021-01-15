<template>
  <div class="text-dark card" style="margin-left: 316px; max-width: 500px">
    <div class="card-header">
      <h2>Add Task</h2>
    </div>
    <form @submit.prevent="add">
      <div>
        <label for="title">Title:</label>
        <input v-model="addTask.title" type="text" id="title" required placeholder="New Task.." />
      </div>
      <div>
        <label for="title">Category:</label>
        <select v-model="addTask.category" class="form-select">
          <option value="" selected>--Select Category--</option>
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div style="margin-top: 5px">
        <button class="btn btn-success" type="submit">Add Task</button>
        <button class="btn btn-danger" @click="change('kanban')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormAddTask",
  props: ["change", "getTask"],
  data() {
    return {
      addTask: {
        title: "",
        category: "",
      },
    };
  },
  methods: {
    add() {
      axios({
        method: `POST`,
        url: `https://kanban-mine-db963.web.app/task`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.addTask.title,
          category: this.addTask.category,
        },
      })
        .then((response) => {
          this.addTask.title = "";
          this.addTask.category = "";
          this.change('kanban');
          this.getTask();
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