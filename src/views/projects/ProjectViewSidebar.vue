<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "添加新" : "更新" }}项目</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="项目名" v-model="dataName" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <!-- DESCRIPTION -->
        <vs-input v-model="dataDescription" label="项目描述" class="mt-5 w-full" name="item-description"/>
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-description') }}</span>

        <div class="mt-5 w-full">
          <label class="vs-input--label">项目成员</label>
          <v-select multiple :closeOnSelect="false" v-model="project_members" :options="memberOptions" v-validate="'required'" name="members" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('members') }}</span>
        </div>

        <!-- STATUS -->
        <div class="vx-row mt-5 w-full">
          <label for="status" class="vx-col">项目状态</label>
          <vs-switch id="status" class="vx-col ml-auto flex" color="success" v-model="dataStatus" label="项目状态">
          </vs-switch>
        </div>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">提交</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">取消</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
  },
  data () {
    return {

      dataId: null,
      dataName: '',
      dataDescription: null,
      dataStatus: false,
      project_members: [],

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      console.log(this.data)
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { _id, title, description, isCompleted, members } = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
        this.dataName = title
        this.dataDescription = description
        this.dataStatus = isCompleted
        this.project_members = members
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.dataName
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    memberOptions () {
      let users = this.$store.state.user.users;
      let userOptions = [];
      users.forEach((ele) => {
        userOptions.push({ label: ele.displayName,  value: ele._id });
      })
      return userOptions
    }
  },
  methods: {
    initValues () {
      if (this.data._id) return
      this.dataId = null
      this.dataName = ''
      this.dataDescription = null
      this.dataStatus = false
      this.project_members = []
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            title: this.dataName,
            description: this.dataDescription,
            isCompleted: this.dataStatus,
            members: this.project_members
          }
          console.log(obj)
          if (this.dataId !== null) {
            this.$store.dispatch('project/updateProject', obj).catch(err => { console.error(err) })
          } else {
            delete obj._id
            this.$store.dispatch('project/addProject', obj).catch(err => { console.error(err) })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
