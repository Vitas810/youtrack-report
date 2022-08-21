<template>
    <div class="tasks">
        <h4>Приоритетные задачи: </h4>
        <ul v-if="tasks">
            <jf-task v-for="task in tasks.priority"
                     :key="task.id"
                     :task="task"
            />
        </ul>

        <h4>Планы на {{ month }} 2022: </h4>
        <ul v-if="tasks">
            <jf-task v-for="task in tasks.onGradeTask"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.performance"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.inWork"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.test"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.verified"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.release"
                     :key="task.id"
                     :task="task"
            />

            <jf-task v-for="task in tasks.masterTest"
                     :key="task.id"
                     :task="task"
            />
        </ul>
    </div>
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
        }),
        month() {
            const options = { month: 'long' };
            const date  = new Date();
            const month = new Date( date.getFullYear(), date.getMonth()+1, 1 );
            return month.toLocaleDateString("ru", options)
        }
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

<style scoped>
    .tasks {
        max-width: 1000px;
        margin: auto;
    }
    h4 {
        margin: 5px 0;
    }
    ul {
        padding-left: 0;
        margin: 0;
    }
</style>