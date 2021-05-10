<template>
  <div>
    <div class="Bread">
      <Breadcrumb>
        <BreadcrumbItem to="/welcomePage">首页</BreadcrumbItem>
        <BreadcrumbItem style="font-weight:400">部门列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="add_button">
      <Button type="primary" @click="()=>{modal1 = true}">添加</Button>
      <Modal v-model="modal1" title="请输入将要添加的部门信息" @on-ok="ok" @on-cancel="cancel">
        <Form :model="addDepartmentMsg" label-position="left" :label-width="100">
          <FormItem label="部门名称">
            <Input v-model="addDepartmentMsg.name" />
          </FormItem>
          <FormItem label="部门管理员">
            <Select v-model="addDepartmentMsg.manager">
              <Option value="刘文杰">刘文杰</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <div class="_table">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "departmentList",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      theme2: "light",
      modal1: false,
      ipAdd: "http://81.70.233.131:3000",
      columns1: [
        {
          title: "部门ID",
          key: "id",
          align: "center"
        },
        {
          title: "部门名称",
          key: "name",
          align: "center"
        },
        {
          title: "管理员",
          key: "manager",
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
                      this.deleteDepartment(params.row.id);
                    }
                  }
                },
                "删除"
              ),
              
            ]);
          }
        }
      ],
      deleteData: {
        deleteData: ""
      },
      data1: [],
      addDepartmentMsg: {
        name: "",
        manager: ""
      },

    };
  },
  methods: {
    ok() {
      this.$axios
        .post(this.ipAdd+"/addDepartment", {
          data: this.addDepartmentMsg
        })

        .then(response => {
          console.log(response.data.data);
          this.getDepartmentList();
        });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getDepartmentList() {
      this.$axios
        .get(this.ipAdd+"/getDepartmentList")
        .then(response => {
          console.log(response.data.data);
          this.data1 = response.data.data;
        });
    },
    deleteDepartment(id) {
      this.$axios
        .post(this.ipAdd+"/deleteDepartment", {
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
          this.getDepartmentList();
        });
    }
  },
  mounted: function() {
    //自动触发写入的函数
    this.getDepartmentList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.Bread {
  padding-left: 20px;
  padding-top: 20px;
}
.add_button {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
.add_button {
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
._table {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
