<template>
    <v-app>
        <!-- <v-> -->
            <div class="main">
                <div class="dialog">
                    <img id="logo" src="../assets/login/logo.png" />
                    <div class="form">
                        <v-text-field
                            autocomplete="off"
                            class="input"
                            v-model="form.userAccount"
                            placeholder="请输入账号"
                        ></v-text-field>
                        <v-text-field
                            autocomplete="off"
                            @click:append="showPassword = !showPassword"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            class="input"
                            v-model="form.password"
                            placeholder="请输入密码"
                            show-password
                        ></v-text-field>

                        <v-btn
                            block
                            color="primary"
                            :loading="loading"
                            @click="onSubmit"
                            rounded
                        >登录<v-icon dark>mdi-login</v-icon></v-btn>
                    </div>
                </div>
            </div>
        <!-- </v-content> -->
    </v-app>
</template>

<script>
import { login } from '../plugins/api'
export default {
    data() {
        return {
            form: {
                userAccount: "",
                password: ""
            },
            showPassword: false,
            loader: null,
            loading: false
        };
    },

    methods: {
        onSubmit() {
            this.loader = 'loading'
            console.log('data', this.form)
            login(this.form).then(res => {
                console.log('响应的数据', res)
                // 处理登录成功
                if (res.flag === '0') {
                    this.$store.commit('login', this.form)
                    this.$router.push('/index/home')
                }
            })
            // if (response) {
            //     console.log('response', response)
            // }
            // this.$message.warning('登录成功')
        }
    },

    created() {
        /* eslint no-console:off */
        // console.log("asdf");
    },

    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        }
    }
};
</script>

<style scoped>
#logo {
    width: 100%;
    display: block;
    padding-bottom: 25px;
}

.main {
    width: 100%;
    height: 100%;
    background: url("../assets/login/login4.jpg") no-repeat;
    position: fixed;
    display: flex;
    background-size: cover;
    padding-top: 10%;
}

.dialog {
    width: 18%;
    height: 20%;
    margin-top: 10%;
    margin: 0 auto;
    text-align: center;
}

.input {
    margin-top: 5px;
    width: 100%;
    display: block;
}

.button {
    /* margin: 10px auto; */
    display: inline-block;
    width: 100%;
    margin-top: 15px;
}

.form {
    margin-top: 10px;
}
/* 
.v-text-field__slot {
    background: red
} */

  >>> input:-webkit-autofill {
     -webkit-box-shadow: 0 0 0 1000px #029EF1 inset!important;


/* 　　-webkit-text-fill-color: #333; */
    /* box-shadow: 0 0 0px 1000px red inset;
    -webkit-text-fill-color: black;
    caret-color: black; */
  }

</style>