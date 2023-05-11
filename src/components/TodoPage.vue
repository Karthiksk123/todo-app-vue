<template>
  <div class="page-area">
    <div class="input-area ">
      <h1 v-if="editableTask">Edit Task {{ task }}</h1>
      <h1 v-else></h1>
      <input type="text" placeholder="Enter a todo..." v-model="task" />
      <button @click="submitTask" class="sub-btn">Save</button>
    </div>
    <div style="padding-top: 20px; display: flex">
      <input type="text" placeholder="Search a todo" v-model="searchInput" />
      <!-- <button @click="filterData" class="sub-btn">Search</button> -->
    </div>

    <div v-if="filteredList.length > 0">
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
          <tr v-for="(data, index) in filteredList" :key="index">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
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
    <h3 v-else="" style="padding-top: 40px">No Todos Here ...</h3>
  </div>
</template>

<script>
import { useTodoStore } from "../Strore/useTodoStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    //store
    const todoStore = useTodoStore();

    const { task, tasks, editableTask, searchInput, filteredList } =
      storeToRefs(todoStore);

    const { deleteTask, editTask, submitTask } = todoStore;

    return {
      task,
      tasks,
      editableTask,
      searchInput,
      filteredList,
      deleteTask,
      editTask,
      submitTask,
    };
  },
};
</script>

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

input {
  padding: 10px;
  background-color: aliceblue;
  border: #dddddd;
  border-radius: 5px;
  font-size: medium;
}

input:focus {
  outline: none;
}

button {
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
