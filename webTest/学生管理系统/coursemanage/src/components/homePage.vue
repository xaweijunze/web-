<template>
  <div class="hello">
    <div class="header">
      <p>课程管理系统</p>
    </div>
    <div class="page_body">
      <div class="menu">
        <Col span="8" />
        <Menu :theme="theme2">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />账号管理
            </template>
            <MenuItem name="1-1" on-select="ManagerList" to="/managerList">账号列表</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />部门管理
            </template>
            <MenuItem name="2-1" to="/departmentList">部门列表</MenuItem>
          </Submenu>

          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-people" />教师管理
            </template>
            <MenuItem name="3-1" to="/teacherList">教师列表</MenuItem>
          </Submenu>

          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-stats" />学期管理
            </template>
            <MenuItem name="4-1" to="/semesterList">学期列表</MenuItem>
          </Submenu>
        </Menu>
      </div>
      <div class="table_area">
        <router-view/> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      theme2: "light"
    };
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.hello {
  margin-left: 0;
  background-color: #eff2f6;
  height: 800px;
  width: 1440px;
}
.header {
  width: 100%;
  height: 74px;
  background-color: #00142a;
  color: white;
  font-size: 26px;
  line-height: 72px;
  padding-left: 30px;
  box-shadow: 0px -2px 2px white inset;
}
.page_body{
  height: 780px;
}
.menu {
  background-color: white;
  width: 240px;
  height: 100%;
  float: left;

}
.table_area {
  float: left;
  width: 81%;
  height: 100%;
  margin-left: 25px;
  background-color: white;

}

</style>
