
<template>
  <div style="text-align:center">
    <br />
    <Button @click="getList" type="primary">查看当前所有学生信息</Button>
    <br />
    <Table border :columns="columns1" :data="data1"></Table>
    <br />
    <h3 text-align:center>新增学生信息模块</h3>
    <br />
    <Form :model="formItem" :label-width="80" inline>
      <FormItem>
        <Input v-model="formItem.id" placeholder="学号" />
      </FormItem>
      <FormItem>
        <Input v-model="formItem.name" placeholder="姓名" />
      </FormItem>
      <FormItem>
        <Input v-model="formItem.sex" placeholder="性别" />
      </FormItem>
      <FormItem>
        <Input v-model="formItem.age" placeholder="年龄" />
      </FormItem>
      <FormItem>
        <Button @click="addStudent" type="primary">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
    <br />

    <h3 text-align:center>条件查询信息模块</h3>
    <br />
    <Form :model="formItem" :label-width="80" inline>
      <FormItem label="查询条件" prop="city">
        <Select v-model="searchData.searchLabel" placeholder="选择你的查询条件">
          <Option value="id">学号</Option>
          <Option value="name">姓名</Option>
          <Option value="sex">性别</Option>
          <Option value="age">年龄</Option>
        </Select>
      </FormItem>
      <FormItem label prop="city">
        <Input v-model="searchData.searchInfo" placeholder="输入你要查询的内容" />
      </FormItem>
      <FormItem>
        <Button @click="searchStudent" type="primary">查询</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns1" :data="searchData.returnData"></Table>
    <br />

    <h3 text-align:center>删除信息模块</h3>
    <Form :model="formItem" :label-width="100" inline>
      <FormItem label="学号" prop="city">
        <Input v-model="deleteData.deleteId" placeholder="输入要删除的学生学号" />
      </FormItem>
      <FormItem>
        <Button @click="deleteStudent" type="primary">删除</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import axios from "axios";
import origin from "../config/origin";
var img = null;
export default {
  data() {
    return {
      origin,
      value1: 0,
      antoPlaySpeed: 10000,
      bannerWidth: "auto",
      bannerHeight: "auto",
      imageList: [],
      test: [],
      count: 0,
      city: "",
      searchData: {
        searchLabel: "",
        searchInfo: "",
        returnData: []
      },
      deleteData: {
        deleteId: "",
        deleateFlag: ""
      },
      columns1: [
        {
          title: "学号",
          key: "id"
        },
        {
          title: "性别",
          key: "sex"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        }
      ],
      data1: [],
      formItem: {
        id: "",
        name: "",
        sex: "",
        age: ""
      }
    };
  },
  methods: {
    getListCount() {
      axios
        .get("http://localhost:3000/getListCount")
        .then(response => {
          //这里使用箭头函数，可以保证count赋值成功
          console.log(response);
          console.log(response.data.data[0].count);
          this.count = response.data.data[0].count;
        })
        .catch(function(err) {});
    },
    getList() {
      axios.get("http://localhost:3000/getList").then(response => {
        console.log(response.data.data);
        this.data1 = response.data.data;
      });
    },
    addStudent() {
      axios
        .post("http://localhost:3000/addStudent", {
          data: this.formItem
        })
        .then(response => {
          if ((response.data.msg = "success")) alert("添加成功");
          else alert("添加失败");
        });
    },
    searchStudent() {
      console.log(this.searchData.searchLabel);
      console.log(this.searchData.searchInfo);
      axios
        .post("http://localhost:3000/searchStudent", {
          data: this.searchData
        })
        .then(response => {
          console.log(response.data.data);
          this.searchData.returnData = response.data.data;
        });
    },
    deleteStudent() {
      console.log(this.deleteData.deleteId);
      axios
        .post("http://localhost:3000/deleteStudent", {
          data: this.deleteData
        })
        .then(response => {
          console.log(response.data.data);
          this.deleteData.deleateFlag = response.data.msg;
          if ((this.deleteData.deleateFlag = "success")) {
            alert("删除成功！");
          } else {
            alert("删除失败！");
          }
        });
    }
  }
};
</script>
<style>
.demo-carousel {
  text-align: center;
}
.allStudent {
  text-align: center;
}
h1,
h2,
h3 {
  text-align: center;
}
</style>