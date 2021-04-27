<template>
  <div>
    <div>
      <Breadcrumb class="Bread">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem style="font-weight:400">教师列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="add_button">
      <Button type="primary" @click="()=>{modal1 = true}">添加</Button>
      <Modal v-model="modal1" title="请输入将要添加的教师信息" @on-ok="ok" @on-cancel="cancel">
        <Form :model="addTeacherMsg" label-position="left" :label-width="100">
          <FormItem label="姓名">
            <Input v-model="addTeacherMsg.name" />
          </FormItem>
          <FormItem label="手机号">
              <Input v-model="addTeacherMsg.phoneNum" />
          </FormItem>
          <FormItem label="是否绑定微信">
            <Select v-model="addTeacherMsg.WechatBind">
            <Option value="是">是</Option>
            <Option value="否">否</Option>

            </Select>
          </FormItem>
          <FormItem label="所属部门">
            <Select v-model="addTeacherMsg.depart">
            <Option value="保卫科">保卫科</Option>
            <Option value="教导处">教导处</Option>

            </Select>
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
  name: "teacherList",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      theme2: "light",
      modal1: false,
      columns1: [
        {
          title: "教师ID",
          key: "id",
          align: "center"
        },
        {
          title: "教师姓名",
          key: "name",
          align: "center"
        },
        {
          title: "手机号",
          key: "phoneNum",
          align: "center"
        },
        {
          title: "是否绑定微信",
          key: "WechatBind",
          align: "center"
        },
        {
          title: "所属部门",
          key: "depart",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 320,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "课程"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "课程表"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteTeacher(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          },
          
        }
      ],
      tableData: [
        
      ],
      deleteData:{
          deleteFlag:'',
      },
      addTeacherMsg:{
            name:'',
            phoneNum:'',
            WechatBind:'',
            depart:'',
          },
    };

  },
  methods: {
    ok() {
      this.$axios
        .post("http://localhost:3000/addTeacher", {
          data: this.addTeacherMsg
        })

        .then(response => {
          console.log(response.data.data);
          this.getTeacherList();
        });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getTeacherList() {
      this.$axios
        .get("http://localhost:3000/getTeacherList")
        .then(response => {
          console.log(response.data.data);
          this.tableData = response.data.data;
        })
        .catch(function(err) {});
    },
    deleteTeacher(id) {
      this.$axios
        .post("http://localhost:3000/deleteTeacher", {
          data: id
        })

        .then(response => {
          console.log(response.data.data);

          this.deleteData.deleteFlag = response.data.msg;

          if ((this.deleteData.deleteFlag = "success")) {
            alert("删除成功！");
          } else {
            alert("删除失败！");
          }
          this.getTeacherList();
        });
    }
  },
  mounted: function() {
    //自动触发写入的函数
    this.getTeacherList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.Bread {
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
