<style>
  /*…write your styles here*/
  .container{
    background-color: orange;
  }
  .title{
    color: black;
  }
  .tableNew{
    align-items: center;
    align-self: center;
    align-content: center;
    border-radius: 5cm;
    padding: 0 677px;
  }
  .deleteButton{
    color: red;
    display: inline-block;
    border-radius: 2px;
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
      <h1 class="title">List of completed Tasks</h1> 
      <button class="deleteButton" @click="routerPush">Click to view tasks to do</button>
        <table class="tableNew">
            <thead>
                <tr>
                    <th>Task Description</th>
                    <th>Urgency</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sing in finishedtasks" :key="sing.id">
                    <td>{{sing.task}}</td>
                    <td>{{sing.urgency}}</td>
                </tr>
            </tbody>
        </table>


    </div>    
  

</template>

<script>
import axios from 'axios';
export default {
  name: 'CompletedTasks',
  data () {
    return {
      finishedtasks: [],
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
            url: 'http://127.0.0.1:8000/completedtasks/',
           
        }).then(response => this.finishedtasks = response.data);
    },
    routerPush() {
      this.$router.push('/')
    },
   
    


  }
}
</script>










