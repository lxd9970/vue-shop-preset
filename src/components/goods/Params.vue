<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列标</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择商品区域 -->
      <el-row class="cay_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 现在商品分类的级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            props.expandTrigger="hover"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tags 标签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled"
          @click="dialogVisible=true"
            >添加参数</el-button
          >
          <!-- 动态表格数据 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete" size="mini"
                  >删除</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled"
          @click="dialogVisible=true"
            >添加属性</el-button
          >
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete" size="mini"
                  >删除</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数对话框 -->
    <el-dialog
  title="'添加'+titleText"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cateList: [],
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      selectedCateKeys: [],
      activeName: "many",
      manyTableData: [],
      onlyTableData: [],
      dialogVisible:false
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.cateList = res.data;
      console.log(this.cateList);
    },
    //级联选择器选中项发生变化会触发这个函数
    handleChange() {
      this.getParamsData();
    },
    // Tab 标签点击事件处理
    handleClick() {
      console.log(this.activeName);
      this.getParamsData();
    },
    async getParamsData() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        return;
      }
      const {
        data: res,
      } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: { sel: this.activeName },
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      if (this.activeName == "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      }
      return false;
    },
    //当前选中的三级分类ID
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      }
      return null;
    },
    // 动态计算标题文本
    titleText(){
      if(this.activeName=="many"){
        return "动态参数"
      }
      return "静态属性"
    }
  },
};
</script>

<style lang="less" scoped>
.cay_opt {
  margin: 15px 0;
}
</style>