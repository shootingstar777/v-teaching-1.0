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
        <el-form-item prop="userName">
          <el-input
            prefix-icon="el-icon-user"
            v-model="LoginForm.userName"
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
          <el-button type="success" @click="dialogFormVisible = true" round
            >注册</el-button
          >
          <el-button type="info" round @click="resetLoginForm">重置</el-button>
          <el-button type="primary" round @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册界面 -->
    <!-- Form -->
    <el-dialog
      :visible="dialogFormVisible"
      title="注册"
      center
      :show-close="false"
    >
      <el-form
        :model="registerForm"
        :rules="LoginFormRules"
        ref="ruleForm"
        status-icon
      >
        <el-form-item
          label="userName"
          :label-width="formLabelWidth"
          prop="userName"
        >
          <el-input
            v-model="registerForm.userName"
            autocomplete="on"
            style="width: 60%"
            @blur="checkUserName()"
          ></el-input>
          <p class="registerUsernameInfo">{{ registerUsernameInfo }}</p>
        </el-form-item>
        <el-form-item
          label="password"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="registerForm.password"
            autocomplete="off"
            style="width: 60%"
            type="password"
            @blur="checkUserName()"
          ></el-input>
          <p class="registerPasswordInfo">{{ registerPasswordInfo }}</p>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerCancel()">取消</el-button>
          <el-button type="primary" @click="registerFinish()">注册</el-button>
        </span>
      </template>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      dialogVisible: false,
      LoginForm: {
        userName: "shooting",
        password: "Aa123456!",
      },
      registerForm: {
        userName: "",
        password: "",
      },
      LoginFormRules: {
        /* 验证用户名是否合法 */
        userName: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "长度需要2-8个字符",
            trigger: "blur",
          },
        ],
        /* 验证密码是否合法 */
        password: [
          {
            required: true,
            message: "请输入登录密码",
          },
          {
            min: 6,
            max: 15,
            message: "长度需要6-15个字符",
            trigger: "blur",
          },
        ],
      },
      registerUsernameInfo: "",
      registerPasswordInfo: "",
      dialogFormVisible: false,
      formLabelWidth: "30%",
    };
  },
  methods: {
    /* 点击重置按钮，重置登录表单 */
    resetLoginForm() {
      this.$nextTick(() => {
        this.$refs.loginFormRef.resetFields();
      });
      this.$refs.loginFormRef.resetFields();
    },
    /* 点击登录按钮，登录 */
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.$http.post("user/login", this.LoginForm).then(
            (res) => {
              if (res.success == true) {
                window.sessionStorage.setItem("token", res.data.token);
                this.$message.success("登录成功，欢迎进入");
                this.$http
                  .get("user/getUserInfo", {
                    params: { token: sessionStorage.getItem("token") },
                  })
                  .then(
                    (res) => {
                      console.log(res);
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
                return this.$router.push("/home");
              }
            },
            (err) => {
              return this.$message.error(err.message);
            }
          );
        }
        if (!valid) {
          return this.$message.error("登录失败");
        }
      });
    },
    /* 取消注册 */
    registerCancel() {
      this.dialogFormVisible = false;
      this.$message.error("取消注册");
    },
    /* 点击注册按钮 */
    registerFinish() {
      this.$refs.ruleForm.validate((res) => {
        if (res == false) {
          return;
        } else {
          this.$http.post("user/sign", this.registerForm).then(
            (response) => {
              this.$message.success("注册成功，请重新登录");
              this.dialogFormVisible = false;
              this.$refs.ruleForm.resetFields();
            },
            (err) => {
              return (this.registerPasswordInfo = err.message);
            }
          );
        }
      });
    },
    /* 输入表单验证 */
    checkUserName() {
      this.registerUsernameInfo = "";
      this.$http
        .get("user/checkUserName", {
          params: { userName: this.registerForm.userName },
        })
        .then(
          (res) => {
            console.log(res);
            if (!res.data) {
              return (this.registerUsernameInfo = "用户名已存在");
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
};
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
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
.el-dialog .el-form {
  height: 180px;
}
.el-form-item__content {
  margin-top: 30px;
}
.registerUsernameInfo,
.registerPasswordInfo {
  font-size: 12px;
  width: 60%;
  color: #f56c6c;
  margin: 0;
  padding: 0;
}
</style>
