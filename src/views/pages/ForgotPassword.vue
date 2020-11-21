<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-20" v-if="emailSent">
                                <div class="vx-card__title mb-8">
                                  <h4 class="mb-4">邮件已发送</h4>
                                  <p class="mb-8">找回密码邮件已发送到您的邮箱。请您查阅您的电子邮箱，并按说明重设密码。</p>
                                  <vs-button type="border" to="/pages/login" class="w-full ">返回登陆</vs-button>
                                </div>
                            </div>
                            <div class="p-8" v-else>
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">找回密码</h4>
                                    <p>请输入您的电子邮件地址，我们将向您发送有关如何重设密码的说明。</p>
                                </div>

<!--                                <vs-input type="email" label-placeholder="Email" v-model="value1" class="w-full mb-8" />-->
                                <vs-input
                                  v-validate="'required|email|min:3'"
                                  data-vv-validate-on="blur"
                                  name="email"
                                  icon-no-border
                                  icon="icon icon-user"
                                  icon-pack="feather"
                                  label-placeholder="邮箱"
                                  v-model="email"
                                  class="w-full mb-8"/>
                                <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">返回登陆</vs-button>
                                <vs-button class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0" @click="recoverPassword">重设密码</vs-button>
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
      emailSent: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== ''
    }
  },
  methods: {
    recoverPassword() {
      if (this.validateForm) {
        auth.forgotPassword(this.email)
          .then(response => {
            if(response.data._id !== undefined) {
              this.emailSent = true
            }
          })
          .catch(error => { reject(error) })
      }
    }
  }
}
</script>
