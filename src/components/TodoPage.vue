<script>
export default {
  data() {
    return {
      task: "",
      editableTask: null,
      id: 0,
      tasks: [
        {
          name: "Task 1",
          id: Date.now() + 1,
        },
        {
          name: "Task 2",
          id: Date.now() + 2,
        },
        {
          name: "Task 3",
          id: Date.now() + 3,
        },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.editableTask = index;
      this.passData();
    },
    submitTask() {
      if (this.task === "") {
        return new Error("Task name must be more than 0 charecters");
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
      }
    },
    passData() {
      this.$emit("passTitle", this.task);
    },
  },
};
</script>

<template>
  <div class="page-area">
    <div class="input-area">
      <h1 v-if="editableTask">Edit Task {{ task }}</h1>
      <h1 v-else></h1>
      <input type="text" placeholder="Enter a todo..." v-model="task" />
      <button @click="submitTask" class="sub-btn">Save</button>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Task name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="({ id, name }, index) in tasks" :key="index">
            <td>{{ id }}</td>
            <td>{{ name }}</td>
            <td>
              <button @click="editTask(index)" class="edit-btn">Edit</button>
            </td>
            <td>
              <button @click="deleteTask(index)" class="del-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-area {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table-area {
  width: 100%;
  border-radius: 40px;
  background-color: #dddddd;
}

.input-area > input {
  padding: 10px;
  background-color: aliceblue;
  border: #dddddd;
  border-radius: 5px;
  font-size: medium;
}

.input-area > input:focus {
  outline: none;
}

.input-area > button {
  padding: 10px;
  background-color: aliceblue;
  border: #dddddd;
  border-radius: 5px;
  font-size: medium;
  margin-left: 20px;
}

table {
  border-collapse: collapse;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  border: #dddddd;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  background-color: white;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.add-btn {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: teal;
  color: white;
}

.del-btn {
  border: none;
  background-color: red;
  color: white;
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;
  padding: 4px 18px;
  border-radius: 3px;
  cursor: pointer;
}
</style>
