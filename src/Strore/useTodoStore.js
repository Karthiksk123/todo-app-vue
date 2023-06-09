import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todoStore",
  state: () => ({
    task: "",
    editableTask: null,
    tasks: JSON.parse(sessionStorage.getItem("todoStore")) || [],
    searchInput: "",
    todoMode: true,
  }),
  persist: {
    Storage: sessionStorage,
    paths: ["tasks"],
  },
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
      sessionStorage.setItem("todoStore", JSON.stringify(this.tasks));
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
      sessionStorage.setItem("todoStore", JSON.stringify(this.tasks));
    },
    passData() {
      () => {
        this.$emit("passTitle", this.task);
      };
    },
  },
});
