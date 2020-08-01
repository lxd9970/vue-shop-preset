<template>
  <div class="login-container">
  <div class="login-box">
      <!-- 头像区域 -->
  <div class="avatar-box" >
      <img src="../assets/logo.png" alt="">
  </div>
  <!-- 表单区域 -->
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form" >
      <!-- 用户名 -->
  <el-form-item prop="username">
    <el-input v-model="loginForm.username"  prefix-icon="el-icon-s-custom" ></el-input>
  </el-form-item>
  <!-- 密码 -->
    <el-form-item  prop="password">
    <el-input v-model="loginForm.password"  prefix-icon="el-icon-lock" type="password" ></el-input>
  </el-form-item>
  <!-- 登陆按钮 -->
  <el-form-item class="btns" >
   <el-button type="primary" @click="login">登陆</el-button>
   <el-button type="info" @click="resetloginFormRef">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                // 登陆绑定数据对象
          loginForm:{
           username:'admin',
           password:'123456'
          },
        //   验证表单输入
          loginFormRules:{
               username: [
            { required: true, message: '请输入登陆名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
             { required: true, message: '请输入登陆密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          }
            }
        },
        methods:{
            //点击重置表单
            resetloginFormRef(){
                // console.log(this);
                this.$refs.loginFormRef.resetFields()
            },
            login() {
                // console.log(this);
                this.$refs.loginFormRef.validate( async valid => {
                    // console.log(valid);
                    if(!valid) return;
                   const result = await this.$http.post('login',this.loginForm)
                   console.log(result.data);
                   if(result.data.meta.status !==200) return this.$message.error('用户名或密码错误');
                   this.$message.success('登陆成功');
                   window.sessionStorage.setItem('token',result.data.token)
                   this.$router.push('/home')
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        background-color: #2b4b6b;
        height: 100%;
        position: relative;
    }
    
    .login-box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    .avatar-box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px 0 #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login-form{
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>