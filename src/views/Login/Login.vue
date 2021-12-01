<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatat_box">
        <img src="../../assets/logo1.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="LoginForm"
        :rules="LoginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="LoginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="LoginBtns">
          <el-button  type="success"  @click="dialogFormVisible = true" round>注册</el-button>
          <el-button type="info" round @click="resetLoginForm">重置</el-button>
          <el-button type="primary" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

<!-- 注册界面 -->
  <!-- Form -->
  <el-dialog :visible="dialogFormVisible" title="注册" center :show-close="false"	 >
    <el-form :model="registerForm" :rules="LoginFormRules" ref="ruleForm"  status-icon>
      <el-form-item label="username" :label-width="formLabelWidth" prop="username">
        <el-input v-model="registerForm.username" autocomplete="off" style="width:360px"></el-input>
      </el-form-item>
      <el-form-item label="password" :label-width="formLabelWidth" prop="password">
        <el-input v-model="registerForm.password" autocomplete="off"  style="width:360px" type="password"></el-input>
      </el-form-item>
      <el-form-item label="email/phone" :label-width="formLabelWidth" prop="information">
        <el-input v-model="registerForm.information" autocomplete="off"  style="width:360px"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="registerCancel()">取消</el-button>
        <el-button type="primary" @click="registerFinish()"
          >注册</el-button
        >
      </span>
    </template>
  </el-dialog>
<!--  -->




  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      dialogVisible:false,
      LoginForm: {
        username: 'admin',
        password: '123456',
      },
      registerForm:{
        username:'',
        password:'',
        information:''
      },
      LoginFormRules: {
        /* 验证用户名是否合法 */
        username: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 6,
            message: '长度需要2-6个字符',
            trigger: 'blur'
          }
        ],
        /* 验证密码是否合法 */
        password: [
          {
            required: true,
            message: '请输入登录密码'
          },
          {
            min: 6,
            max: 15,
            message: '长度需要6-15个字符',
            trigger: 'blur'
          }
        ],
        /*  */information:[
           {
            required: true,
            message: '请输入联系方式'
          },
          {
            min: 11,
            max: 20,
            message: '请输入合理的联系方式',
            trigger: 'blur'
          }
        ],
      },
       dialogFormVisible: false,
      formLabelWidth: '20%',
    }
  },
  methods: {
    /* 点击重置按钮，重置登录表单 */
    resetLoginForm () {
      this.$nextTick(() => {
        this.$refs.loginFormRef.resetFields()
      })
      this.$refs.loginFormRef.resetFields()
    },
    /* 点击登录按钮，登录 */
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$message.success('登录成功，欢迎进入')
          window.sessionStorage.setItem('token', 'temp')
          return this.$router.push('/home')
        } if (!valid) {
          return this.$message.error('登录失败')
        }
      })
    },
    registerCancel(){
      this.dialogFormVisible = false

 this.$message.error("取消注册")
    },
    registerFinish(){

this.$refs.ruleForm.validate((res)=>{
  if(res==false){
    return;
  }else{
     this.dialogFormVisible = false
this.$refs.ruleForm.resetFields()
 this.$message.success("注册成功，请登录")
  }
  });
    }
    }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatat_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: v0 0 10 #ddd;
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
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.dialog-footer{
  display: flex;
  justify-content: space-between;
}
.el-dialog .el-form{
  height: 180px;
}
.el-form-item__content{
    margin-top: 30px;
}
</style>
