<style>
  /*…write your styles here*/
  .container{
    background-color: orange;
  }
  .title{
    color: black;
  }
  .table{
    align-items: center;
    align-self: center;
    align-content: center;
    border-radius: 5cm;
    padding: 0 500px;
  }
  .deleteButton{
    color: red;
    display: inline-block;
    border-radius: 12px;
  }
  .finishButton{
    color: darkgreen;
    display: inline-block;
    border-radius: 2px;
  }
  .clicking{
    color: black;
    display: inline-block;
    border-radius: 12px;
  }
  .addButton{
    color: green;
    display: inline-block;
    border-radius: 12px;
  }
  .editButton{
    color: blue;
    display: inline-block;
    border-radius: 12px;
  }
  .add_task {
    padding-top: 0.25cm;
    
  }
  .edit_task {
    padding-top: 0.25cm;
    padding-bottom: 0.25cm;
    
  }
  td, tr, th {
    border: 1px solid;
  }
</style>
<template>
    

    <div class="container">
      <h1 class="title">Task Scheduler</h1> 
      <button class="clicking" @click="routerPush">Click to view completed Tasks</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Task Id</th>
                    <th>Task Description</th>
                    <th>Due Date</th>
                    <th>Urgency</th>
                    <th>Click to Delete</th>
                    <th>Finished?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sing in tasks" :key="sing.id">
                    <td>{{sing.id}} </td>
                    <td>{{sing.task}}</td>
                    <td>{{sing.dueDate}}</td>
                    <td>{{sing.urgency}}</td>
                    <td><button class="deleteButton" @click="remove(sing.id)">Delete Task</button></td>
                    <td><button class="finishButton" @click="finish(sing.id, sing.task, sing.urgency)">Finished</button></td>
                </tr>
            </tbody>
        </table>
        <div class="add_task">
          <h3 class="title">Add a task</h3> 
        <form v-on:submit.prevent="submitForm">
          <input type="text" id="taskName" v-model="taskName" placeholder="Task Description">
          <input type="date" id="taskDate" v-model="taskDate">
          <select v-model="taskUrgency" required>
            <option value="" disabled selected>Select urgency level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
                <button class = "addButton" type="submit" @click="addTask">Add Task</button>
        </form>
    </div>

      <div class = edit_task>
        <h3 class="title">Edit a task</h3> 
        <form v-on:submit.prevent="submitForm">
        <input type="text" v-model="taskNumberEdit" placeholder="Task ID">
        <input type="text" v-model="taskNameEdit" placeholder="Task Description">
        <input type="date" v-model="dueDateEdit">
        <select id="editurgency" v-model="urgencyEdit">
          <option value="" disabled selected>Select urgency level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button class="editButton" @click="editTask">Edit Task</button>
      </form>
      </div>
    </div>    
  

</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      tasks: [],
      taskName: "",
      taskDate: "",
      taskUrgency:"",
      taskNameEdit: "",
      dueDateEdit: "",
      urgencyEdit:"",
      taskNumberEdit:null
    }
  },
  mounted () { 
    this.get_Tasks();
  },
  methods: {
    get_Tasks() {
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/drinks/',
           
        }).then(response => this.tasks = response.data);
    },
    routerPush() {
      this.$router.push({ path: 'completed' })
    },
    async addTask() {
      console.log(this.taskName);
      console.log(this.taskDate);
      console.log(this.taskUrgency);
      const article = {
          task: this.taskName,
          dueDate:  this.taskDate,
          urgency: this.taskUrgency,
        }
      await axios.post('http://127.0.0.1:8000/drinks/', article);
      await axios.get('http://127.0.0.1:8000/drinks/').then(response => this.tasks = response.data);
      this.taskName = null;
      this.taskDate = null;
      this.taskUrgency = "";
 
      //this.get_Tasks();
    },
    async editTask() {
      console.log(this.taskName);
      console.log(this.taskDate);
      console.log(this.taskUrgency);
      const article = {
          task: this.taskNameEdit,
          dueDate:  this.dueDateEdit,
          urgency: this.urgencyEdit,
        }
      console.log(article)
      await axios.put('http://127.0.0.1:8000/drinks/' + this.taskNumberEdit, article);
      await axios.get('http://127.0.0.1:8000/drinks/').then(response => this.tasks = response.data);

      this.taskNumberEdit = null;
      this.taskNameEdit = null;
      this.dueDateEdit = null;
      this.urgencyEdit = "";
      //this.get_Tasks();
    },
    async remove(num) {
      console.log(num);
      await axios.delete('http://127.0.0.1:8000/drinks/' + num);
      await axios.get('http://127.0.0.1:8000/drinks/').then(response => this.tasks = response.data);
    },
    async finish(num, desc, urg) {
      console.log(num);
      const article = {
          task: desc,
          urgency: urg,
        }
      await axios.delete('http://127.0.0.1:8000/drinks/' + num);
      await axios.post('http://127.0.0.1:8000/completedtasks/', article);
      await axios.get('http://127.0.0.1:8000/drinks/').then(response => this.tasks = response.data);
    }

  }
}
</script>










