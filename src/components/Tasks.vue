<template v-if="tasks">
    <ul>
        <jf-task v-for="task in tasks" :key="task.idReadable" :task="task"/>
    </ul>
</template>

<script>
import {mapState} from "vuex";
import {actionTypes} from "@/store/modules/tasks";
import JfTask from "@/components/Task";

export default {
    name: 'JfTasks',
    components: {JfTask},
    data() {
        return {
            url: '/issues?query=%23Unresolved%20%23я&fields=summary,idReadable,customFields(name,value(name))&customFields=Оценка&customFields=State&customFields=priority',
        }
    },
    computed: {
        ...mapState({
            isLoading: (state) => state.tasks.isLoading,
            tasks: (state) => state.tasks.data,
            error: (state) => state.tasks.error,
        })
    },
    mounted() {
        this.getTask()
    },
    methods: {
      getTask() {
          this.$store.dispatch(actionTypes.getTasks, {url: this.url})
      },
  }
}
</script>