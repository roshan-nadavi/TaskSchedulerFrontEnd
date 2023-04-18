import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CompletedTasks from './components/CompletedTasks.vue'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[{ path: '/', name:'home', component: HelloWorld},
    { path: '/completed', name: 'completed', component: CompletedTasks}]
});

createApp(App).use(router).mount('#app')

//app.use(router)

//app.mount('#app')
