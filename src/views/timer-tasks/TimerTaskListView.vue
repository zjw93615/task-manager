<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" v-model="selected" :max-items="itemsPerPage" :data="timerTasks">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center full-width">
          <div class="flex full-width">
            <vs-input class="w-full" placeholder="任务名称" v-model="newTimerTaskTitle" />
            <v-select v-model="newTimerTaskProject" class="w-full" :clearable="false" :options="projectOptions" placeholder="选择项目" v-validate="'required'" name="project" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <flat-pickr :config="configFromdateTimePicker" v-model="newTimerTaskStartTime" placeholder="开始时间" @on-change="onFromChange" />
            <flat-pickr :config="configTodateTimePicker" v-model="newTimerTaskEndTime" placeholder="结束时间" @on-change="onToChange" />
            <vs-button class="w-full" color="success" type="filled" v-if="!doingTask" @click="addTimerTask">开始</vs-button>
            <vs-button class="w-full" color="danger" type="filled" v-else>结束</vs-button>
          </div>
        </div>

      </div>

      <template slot="thead">
        <vs-th sort-key="title">名字</vs-th>
<!--        <vs-th sort-key="description">描述</vs-th>-->
        <vs-th sort-key="isCompleted">进度</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="project-name font-medium truncate">{{ tr.title }}</p>
          </vs-td>

<!--          <vs-td>-->
<!--            <p class="project-description">{{ tr.description | title }}</p>-->
<!--          </vs-td>-->

          <vs-td>
            <vs-chip :color="getOrderStatusColor(tr.isCompleted)" class="project-status">{{ tr.isCompleted ? '完成' : '未完成' }}</vs-chip>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
            <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr._id)" />
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-pagination :total="totalPage" v-model="currentPage"></vs-pagination>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import timerTaskController from '@/http/requests/timerTask/index'
import DataViewSidebar from './TimerTaskViewSidebar.vue'
import 'flatpickr/dist/flatpickr.css';
export default {
  data () {
    return {
      selected: [],
      isMounted: false,

      // TimerTask Data
      newTimerTaskTitle: "",
      newTimerTaskProject: "",
      newTimerTaskStartTime: 0,
      newTimerTaskEndTime: 0,
      configFromdateTimePicker: {
        minDate: new Date(),
        maxDate: null,
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      },
      configTodateTimePicker: {
        minDate: null,
        enableTime: true,
        dateFormat: 'Y-m-d H:i'
      },
      doingTask: false,

      // Data Table
      timerTasks: [],
      itemsPerPage: 40,
      currentPage: 1,
      totalPage: 40,


      // Data Sidebar
      addNewDataSidebar: false,
      sidebarData: {}

    }
  },
  components: {
    vSelect,
    flatPickr,
    DataViewSidebar
  },
  computed: {

    projectOptions () {
      let projects = this.$store.state.project.projects;
      let projectOptions = [];
      projects.forEach((ele) => {
        projectOptions.push({ label: ele.title,  value: ele._id });
      })
      return projectOptions
    },
  },
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData (id) {
      console.log(id)
      this.$store.dispatch('project/removeProject', id).catch(err => { console.error(err) })
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor (status) {
      if (status) return 'success'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    onFromChange(selectedDates, dateStr, instance) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr);
    },
    onToChange(selectedDates, dateStr, instance) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr);
    },
    addTimerTask() {
      console.log(this.newTimerTaskProject)
      let timerTask = {
        title: this.newTimerTaskTitle,
        project: this.newTimerTaskProject['value'],
        startTime: this.newTimerTaskStartTime ? this.newTimerTaskStartTime : new Date(),
        endTime: this.newTimerTaskEndTime ? this.newTimerTaskEndTime : null,
        isCompleted: Boolean(this.newTimerTaskEndTime)
      }

      timerTaskController.addTimerTask(timerTask).then(response => {
        this.timerTasks.unshift(response.data)
        if(this.timerTasks.length > 40) this.timerTasks.pop()
      })
    },
    getTimerTasks(limit = -1, skip = -1) {
      if(limit === -1) {
        limit = this.itemsPerPage
      }

      if(skip === -1) {
        skip = (this.currentPage - 1) * limit
      }

      timerTaskController.getTimerTasks(limit, skip).then(response => {
        this.timerTasks = response.data ? response.data : []
      })
    }
  },
  created () {
    this.getTimerTasks()
    this.$store.dispatch('project/fetchProjects')
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">

#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
        td{
          padding: 20px;
          &:first-child{
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }
          &:last-child{
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }
        td.td-check{
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }

  .full-width {
    width: 100%;
  }
}
</style>
