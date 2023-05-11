import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todoStore",
  state: () => ({
    task: "",
    editableTask: false,
    tasks: JSON.parse(localStorage.getItem("todoData")) || [],
    searchInput: "",
    todoMode: true,
  }),
  getters: {
    filteredList() {
      if (this.tasks != undefined) {
        return this.tasks.filter((data) => {
          return data.name
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        });
      }
    },
    InputType() {
      console.log("current", this.todoMode);
      if (this.todoMode) {
        return this.task;
      } else {
        return this.searchInput;
      }
      console.log("after", this.todoMode);
    },
  },
  actions: {
    deleteTask(index) {
      if (this.editableTask != null) {
        return;
      } else {
        this.tasks.splice(index, 1);
        this.task = "";
      }
      localStorage.setItem("todoData", JSON.stringify(this.tasks));
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editableTask = index;
      this.todoMode = true;
      this.passData();
    },
    submitTask() {
      if (!this.task.trim()) {
        return;
      } else if (this.editableTask != null) {
        this.tasks[this.editableTask].name = this.task;
        this.editableTask = null;
        this.task = "";
      } else {
        this.tasks.push({
          name: this.task,
          id: Date.now() + 4,
        });
        this.task = "";
        this.passData();
      }
      localStorage.setItem("todoData", JSON.stringify(this.tasks));
    },
    passData() {
      () => {
        this.$emit("passTitle", this.task);
      };
    },
  },
});
