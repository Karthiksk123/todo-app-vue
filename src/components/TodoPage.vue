<template>
  <div class="page-area mt-10">
    <div class="input-area">
      <h1 v-if="editableTask">Edit Task {{ task }}</h1>
      <h1 v-else></h1>
      <div class="flex rounded-md p-4">
        <v-container
          class="rounded-md flex justify-center items-center bg-yellow h-16"
        >
          <v-text-field
            type="text"
            placeholder="Enter a todo..."
            v-model="task"
            v-if="todoMode"
            @keyup.enter="submitTask"
            density="compact"
            variant="text"
            class="w-72 mt-5 text-lg"
            clearable
          />
          <v-text-field
            type="text"
            placeholder="Search todo ..."
            v-model="searchInput"
            v-if="!todoMode"
            density="compact"
            variant="text"
            clearable
            class="w-64 mt-5 text-lg"
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
        </v-container>
        <v-container class="max-w">
          <v-btn
            @click="submitTask"
            class="sub-btn"
            color="blue"
            v-if="todoMode"
          >
            <span> Save </span>
          </v-btn>
          <v-btn
            @click="todoMode = !todoMode"
            class="sub-btn"
            color="blue"
            v-if="!todoMode"
          >
            <span> Cancel </span>
          </v-btn>
        </v-container>
      </div>
    </div>
    <div v-if="filteredList.length > 0">
      <v-table height="400px">
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
              <v-btn
                @click="editTask(index)"
                class="edit-btn"
                outlined
                color="success"
              >
                <v-icon
                  left
                  color="white"
                  size="small"
                  icon="mdi-pencil"
                  class="mr-2"
                ></v-icon>
                Edit</v-btn
              >
            </td>
            <td>
              <v-btn @click="deleteTask(index)" class="del-btn" outlined>
                <v-icon
                  color="black"
                  size="large"
                  icon="mdi-delete"
                  class="mr-2"
                ></v-icon
                >Delete
              </v-btn>
              <!-- <v-dialog v-model="deleteDialog" class="max-w-xl h-auto">
                <v-container
                  class="bg-white rounded-md text-2xl flex flex-col gap-5 justify-center items-center"
                >
                  <h1 class="mt-5">Really want to delete ?</h1>
                  <v-container class="flex justify-center items-center gap-10">
                    <v-btn
                      @click="deleteTask(index), (deleteDialog = false)"
                      class="del-btn"
                      outlined
                    >
                      <v-icon
                        color="black"
                        size="large"
                        icon="mdi-delete"
                        class="mr-2"
                      ></v-icon
                      >Delete
                    </v-btn>
                    <v-btn
                      @click="deleteDialog = false"
                      class="bg-black place-content-center"
                      outlined
                    >
                      <v-icon
                        color="white"
                        size="large"
                        icon="mdi-cancel"
                        class="mr-2 py-5"
                      ></v-icon
                      >Cancel
                    </v-btn>
                  </v-container>
                </v-container>
              </v-dialog> -->
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <h3 v-else="" style="padding-top: 40px">No Todos Here ...</h3>
  </div>
</template>

<script>
import { useTodoStore } from "../Strore/useTodoStore";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      deleteDialog: false,
    };
  },
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
