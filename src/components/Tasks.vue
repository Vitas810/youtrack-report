<template>
    <ul v-if="tasks">
        <jf-task v-for="task in tasks.gradeTask"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.onGradeTask"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.performance"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.inWork"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.test"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.verified"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.release"
                 :key="task.id"
                 :task="task"
        />
        <hr>
        <jf-task v-for="task in tasks.masterTest"
                 :key="task.id"
                 :task="task"
        />
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
            url: '/issues?query=%23Unresolved%20%23я&fields=id,summary,idReadable,project(shortName),customFields(name,value(name))&customFields=State&customFields=priority',
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