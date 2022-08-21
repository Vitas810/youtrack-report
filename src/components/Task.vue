<template>
    <li v-if="vTask">
        <span v-if="vTask" v-text="vTask.id"></span>
        <span v-if="vTask.description" v-text="vTask.description"></span>
        <span v-if="vTask.priority" v-text="vTask.priority"></span>
        (<span v-if="vTask.type" v-text="vTask.type"></span>
        <span v-if="vTask.presentation" v-text="vTask.presentation"></span>)
    </li>
</template>

<script>
 import { preparedTask} from "@/helpers/preparedTask";

export default {
    name: 'jfTask',
    props: {
        task: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            vTask: null
        }
    },
    computed: {},
    mounted() {
        preparedTask(this.task).then(task => {
            this.vTask = task
        })
    },
    methods: {},
}
</script>