<template>
  <div>
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/welcomePage">首页</BreadcrumbItem>
        <BreadcrumbItem style="font-weight:400">账号列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="add_button">
      <Button type="primary" @click="()=>{modal1 = true}">添加</Button>
      <Modal v-model="modal1" title="请输入将要添加的管理员信息" @on-ok="ok" @on-cancel="cancel">
        <Form :model="addManagerMsg" label-position="left" :label-width="100">
          <FormItem label="账号">
            <Input v-model="addManagerMsg.username" />
          </FormItem>
          <FormItem label="类型">
            <Select v-model="addManagerMsg.type">
                <Option value="普通管理员">普通管理员</Option>

            </Select>
          </FormItem>
          <FormItem label="昵称">
            <Input v-model="addManagerMsg.name" />
          </FormItem>
          <FormItem label="密码">
            <Input v-model="addManagerMsg.usercode" />
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div class="_table">
      <Table border :columns="columns1" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "managerList",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      theme2: "light",
      modal1: false,
      ipAdd: "http://81.70.233.131:3000",
      columns1: [
        {
          title: "管理员ID",
          key: "id",
          align: "center"
        },
        {
          title: "管理员账号",
          key: "username",
          align: "center"
        },
        {
          title: "管理员类型",
          key: "type",
          align: "center"
        },
        {
          title: "管理员昵称",
          key: "name",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteManager(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      deleteData:{
        deleteData:''
      },
      addManagerMsg: {
        username: "",
        type: "",
        name: "",
        usercode: "",
      }
    };
  },
  methods: {
    ok() {
      this.$axios
        .post(this.ipAdd+"/addManager", {
          data: this.addManagerMsg
        })

        .then(response => {
          console.log(response.data.data);
          this.getManagerList();
        });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getManagerList() {
      this.$axios
        .get(this.ipAdd+"/getManagerList")
        .then(response => {
          console.log(response.data.data);
          this.tableData = response.data.data;
        })
        .catch(function(err) {});
    },
    deleteManager(id) {
      this.$axios
        .post(this.ipAdd+"/deleteManager", {
          data: id
        })

        .then(response => {
          console.log(response.data.data);

          this.deleteData.deleateFlag = response.data.msg;

          if ((this.deleteData.deleateFlag = "success")) {
            alert("删除成功！");
          } else {
            alert("删除失败！");
          }
          this.getManagerList();
        });
    }
  },
  mounted: function() {
    //自动触发写入的函数
    this.getManagerList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.bread{
  padding: 20px;
}
.add_button {
  padding-left: 20px;
  padding-bottom: 20px;
}
._table {
  padding-left: 20px;
  padding-right: 20px;

}
</style>
