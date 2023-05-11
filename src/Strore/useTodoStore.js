import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todoStore",
  state: () => ({
    task: "",
    editableTask: null,
    tasks: JSON.parse(localStorage.getItem("todoData")) || [],
    searchInput: "",
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
