<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <zk-table
        class="treeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        border
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>

        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </zk-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
       @close="addCateDialogClose"
    >
      <el-form
        :model="addCateForm"
        status-icon
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
          <el-form-item label="父级分类：" >
            <!-- 父级选择器 -->
           <el-cascader
    v-model="selectKeys"
    :options="parentCatelist"
    :props="cascaderProps"
     expand-trigger="hover"
     clearable
     change-on-select
    @change="parentCateChanged"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate"
          >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Cate",
  data() {
    return {
      //网络请求参数
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      catelist: [],
      total: 0,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      //控制分类对话框显示与影藏
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: "",
        cat_pid:0,
        cat_level:0
      },
      // 添加表单规则对象
      addCateFormRules: {
        cat_name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      parentCatelist:[],
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      // 选中父级分类的Id数组
      selectKeys:[]
    };
  },
  created() {
    this.getCatelist();
  },
  methods: {
    //获取商品分类数据
    async getCatelist() {
      const { data: res } = await this.$http.get("categories", {
        params: this.querInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.catelist = res.data.result;
      this.total = res.data.total;
    },
    // 监听 pagesize改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize;
      this.getCatelist();
    },
    handleCurrentChange(newNum) {
      this.querInfo.pagenum = newNum;
      this.getCatelist();
    },
    showAddCateDialog() {
      this.getParentCatelist()
      this.addCateDialogVisible = true;
    },
   async getParentCatelist(){
  const {data:res}=  await  this.$http.get('categories',{params:{type:2}})
   if(res.meta.status!==200){
     return this.$message.error('huoqushibai')
   }
   this.parentCatelist=res.data
    },

    parentCateChanged(){
    console.log(this.selectKeys);
    console.log(this.parentCatelist);
    // 如果selectKeys数组的长度等于0时，说明没有选择父级
    // 反之就选中
    if(this.selectKeys.length>0){    
      // 父级分类的ID  
     this.addCateForm.cat_pid=this.selectKeys[this.selectKeys.length-1]
    //  为当前的等级赋值
     this.addCateForm.cat_level=this.selectKeys.length
     return
    }else{
      this.addCateForm.cat_pid=0
      this.addCateForm.cat_level=0
    }
    },
    // 点击按钮添加分类
    addCate(){
          this.$refs.addCateFormRef.validate(async valid =>{
            if(!valid) return
        const {data: res} = await this.$http.post('categories',this.addCateForm)
          if(res.meta.status!==201){
            return this.$message.error('添加失败')
          }
          this.$message.success('添加成功')
          this.getCatelist()
      this.addCateDialogVisible=false
          })
          
    },
    // 监听对话框关闭时间
    addCateDialogClose(){
       this.$refs.addCateFormRef.resetFields()
       this.selectKeys=[]
       this.addCateForm.cat_level=0
       this.addCateForm.cat_pid=0
    }
  },
};
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}
</style>