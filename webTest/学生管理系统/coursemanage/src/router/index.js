import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import managerList from '@/components/managerList'
import teacherList from '@/components/teacherList'
import departmentList from '@/components/departmentList'
import semesterList from '@/components/semesterList'
import welcomePage from '@/components/welcomePage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
      children:[
        {path: '/welcomePage',component: welcomePage,},
        {path: '/managerList',component: managerList,},
        {path: '/teacherList',component: teacherList,},
        {path: '/departmentList',component: departmentList,},
        {path: '/semesterList',component: semesterList,},


      ]
    }
  ]
})
