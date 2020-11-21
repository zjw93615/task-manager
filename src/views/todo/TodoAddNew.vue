<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full">Add Task</vs-button>
    <vs-prompt
        title="Add Task"
        accept-text= "Add Task"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addTodo"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">

                    <div class="vx-col ml-auto flex">
                        <feather-icon icon="InfoIcon" class="cursor-pointer" :svgClasses="[{'text-success stroke-current': taskLocal.isImportant}, 'w-5', 'h-5 mr-4']" @click.prevent="taskLocal.isImportant = !taskLocal.isImportant"></feather-icon>

                        <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="[{'text-warning stroke-current': taskLocal.isStarred}, 'w-5', 'h-5 mr-4']" @click.prevent="taskLocal.isStarred = !taskLocal.isStarred"></feather-icon>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <vs-input v-validate="'required'" name="title" class="w-full mb-4 mt-5" placeholder="Title" v-model="taskLocal.title" :color="validateForm ? 'success' : 'danger'" />
                        <v-select v-model="taskLocal.project" class="w-full mb-4 mt-5" :clearable="false" :options="projectOptions" v-validate="'required'" name="project" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <vs-textarea rows="5" label="Add description" v-model="taskLocal.description" />
                    </div>
                </div>

            </form>
        </div>
    </vs-prompt>
    </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  data () {
    return {
      activePrompt: false,

      taskLocal: {
        title: '',
        description: '',
        project: {},
        isCompleted: false,
        isImportant: false,
        isStarred: false
      }
    }
  },
  components: {
    vSelect
  },
  computed: {
    taskTags () {
      return this.$store.state.todo.taskTags
    },
    validateForm () {
      return !this.errors.any() && this.taskLocal.title !== ''
    },
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
    clearFields () {
      Object.assign(this.taskLocal, {
        title: '',
        description: '',
        isCompleted: false,
        isImportant: false,
        isStarred: false
      })
    },
    addTodo () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('todo/addTask', Object.assign({}, this.taskLocal))
          this.clearFields()
        }
      })
    }
  }
}
</script>
