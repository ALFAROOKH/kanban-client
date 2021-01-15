<template>
  <div class="container" id="kanban">
    <div>
      <button
        v-if="kanbanPage == 'kanban'"
        class="btn btn-primary"
        @click="change('addTask')"
      >
        New Task
      </button>
    </div>
    <kanban-data
      v-if="kanbanPage == 'kanban'"
      :Tasks="Tasks"
      @getOne="getOne"
      :getTask="getTask"
    ></kanban-data>

    <form-add-task
      v-else-if="kanbanPage == 'addTask'"
      :change="change"
      :getTask="getTask"
    ></form-add-task>

    <form-edit-task
      v-else-if="kanbanPage == 'editTask'"
      :editTask="editTask"
      :change="change"
      :getTask="getTask"
      :show="show"
    ></form-edit-task>
  </div>
</template>

<script>
import axios from "axios";
import FormAddTask from "./FormAddTask";
import FormEditTask from "./FormEditTask";
import KanbanData from "./KanbanData";

export default {
  name: "KanbanTable",
  data() {
    return {
      kanbanPage: "kanban",
      editTask: {
        id: "",
        title: "",
        category: "",
      },
    };
  },
  methods: {
    change(page) {
      this.kanbanPage = page;
    },
    getOne(id) {
      axios({
        method: `GET`,
        url: `https://kanban-mine-db963.web.app/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.editTask.id = data.id;
          this.editTask.title = data.title;
          this.editTask.category = data.category;
          this.editTask.id = data.id;
          this.kanbanPage = "editTask";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    FormAddTask,
    FormEditTask,
    KanbanData,
  },
  props: ["Tasks", "getTask", "show"],
};
</script>

<style>
</style>