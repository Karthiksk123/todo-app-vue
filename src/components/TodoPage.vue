<template>
  <div class="page-area mt-24">
    <div class="input-area">
      <h1 v-if="editableTask">Edit Task {{ task }}</h1>
      <h1 v-else></h1>
      <div class="flex rounded-md p-4">
        <label class="flex bg-blue-100 items-center rounded-md">
          <input
            type="text"
            placeholder="Enter a todo"
            v-model="task"
            v-if="todoMode"
            @keyup.enter="submitTask"
          />
          <input
            type="text"
            placeholder="Search todo ..."
            v-model="searchInput"
            v-if="!todoMode"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 bg-transparent mx-1"
            @click="todoMode = !todoMode"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
        <button @click="submitTask" class="sub-btn">
          {{ editableTask ? "Save" : !todoMode ? "Cancel" : "Save" }}
        </button>
      </div>
    </div>
    <!-- <div style="padding-top: 20px; display: flex">
      <input type="text" placeholder="Search a todo" v-model="searchInput" />
      <button @click="filterData" class="sub-btn">Search</button>
    </div> -->

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

    const {
      task,
      tasks,
      editableTask,
      searchInput,
      filteredList,
      InputType,
      todoMode,
    } = storeToRefs(todoStore);

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
      InputType,
      todoMode,
    };
  },
};
</script>

<style scoped>
.page-area {
  width: 100%;
  height: max-content;
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
