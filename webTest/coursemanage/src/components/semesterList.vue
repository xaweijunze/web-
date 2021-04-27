<template>
  <div>
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem style="font-weight:400">学期列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="add_button">
      <Button type="primary" @click="()=>{modal1 = true}">添加</Button>
      <Modal v-model="modal1" title="请输入将要添加的教师信息" @on-ok="ok" @on-cancel="cancel">
        <Form :model="addSemesterMsg" label-position="left" :label-width="100">
          <FormItem label="学期名称">
            <Input v-model="addSemesterMsg.name" />
          </FormItem>
          <FormItem label="周末类型">
            <Input v-model="addSemesterMsg.type" />
          </FormItem>
          <FormItem label="开始时间">
            <Row>
                    <DatePicker type="date" placeholder="Select date" v-model="addSemesterMsg.startTime"></DatePicker>
            </Row>
          </FormItem>
          <FormItem label="结束时间">
            <Row>
                    <DatePicker type="date" placeholder="Select date" v-model="addSemesterMsg.endTime"></DatePicker>
            </Row>
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
  name: "semesterList",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      theme2: "light",
      modal1: false,
      columns1: [
        {
          title: "学期ID",
          key: "id",
          align: "center"

        },
        {
          title: "学期类型",
          key: "name",
          align: "center"
        },
        {
          title: "周末类型",
          key: "type",
          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center"
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center"
        },
        {
          title: "当前是否在学期内",
          key: "inOut",
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
                      this.deleteSemester(params.row.id);
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
      deleteData: {
        deleteFlag: ""
      },
      addSemesterMsg: {
        name: "",
        type: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  methods: {
    ok() {
          
      this.$axios
        .post("http://localhost:3000/addSemester", {
          data: this.addSemesterMsg
        })

        .then(response => {
          console.log(response.data.data);
          this.getSemesterList();
        });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getSemesterList() {
    this.$axios
      .get("http://localhost:3000/getSemesterList")
      .then(response => {
        
        console.log(response.data.data);
        this.tableData = response.data.data;
        this.tableData.forEach(element => {
          element.startTime = element.startTime.substr(0,10);
          element.endTime = element.endTime.substr(0,10);

        });
      })
      .catch(function(err) {});
  },
  deleteSemester(id) {
    this.$axios
      .post("http://localhost:3000/deleteSemester", {
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
        this.getSemesterList();
      });
  },


  },
    mounted: function() {
    //自动触发写入的函数
    this.getSemesterList();
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.bread {
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
