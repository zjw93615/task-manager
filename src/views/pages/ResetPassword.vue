<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">重设密码</h4>
                                    <p>请输入您的新密码</p>
                                </div>
                                <vs-input
                                  v-validate="'required|email'"
                                  data-vv-validate-on="blur"
                                  name="email"
                                  type="email"
                                  label-placeholder="邮箱"
                                  placeholder="邮箱"
                                  v-model="email"
                                  class="w-full mb-6" />
                                <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                                <vs-input
                                  ref="password"
                                  type="password"
                                  data-vv-validate-on="blur"
                                  v-validate="'required|min:7'"
                                  name="password"
                                  label-placeholder="密码"
                                  placeholder="密码"
                                  v-model="password"
                                  class="w-full mb-6" />
                                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                                <vs-input
                                  type="password"
                                  v-validate="'min:6|confirmed:password'"
                                  data-vv-validate-on="blur"
                                  data-vv-as="password"
                                  name="confirm_password"
                                  label-placeholder="确认密码"
                                  placeholder="确认密码"
                                  v-model="confirm_password"
                                  class="w-full mb-8" />
                                <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>

                                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                    <vs-button type="border" to="/pages/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">返回登陆</vs-button>
                                    <vs-button class="w-full sm:w-auto" @click="resetPassword">重设密码</vs-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import auth from '../../http/requests/auth/jwt/index'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== '' && this.confirm_password !== ''
    }
  },
  methods: {
    resetPassword () {
      console.log(this.$route.query.token)
      if(this.validateForm && this.$route.query.token !== undefined) {
        auth.resetPassword(this.email, this.$route.query.token, this.password)
          .then(response => {
            if(response.data._id === undefined) {
              this.$vs.notify({
                title: '您的数据不完整',
                text: '请保证所有数据已经正确填写，并且网址没有错误',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
              })
            }else {
              this.$router.push('/pages/login').catch(() => {})
            }
          })
          .catch(error => { reject(error) })
      }else {
        this.$vs.notify({
          title: '您的数据不完整',
          text: '请保证所有数据已经正确填写，并且网址没有错误',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
      }
    }
  }
}
</script>
