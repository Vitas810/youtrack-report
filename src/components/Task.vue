<template>
    <li v-if="vTask" class="task">
        <span v-if="vTask" class="task-id" v-text="vTask.id"></span>
        <span class="dotted"></span>
        <span>
            <span v-if="vTask.description" v-text="vTask.description"></span>
            <template v-if="vTask.presentation">
                ( <span v-if="statusLists.includes(vTask.type)" v-text="vTask.type"></span> |
                Оценка: <span v-if="vTask.presentation" v-text="vTask.presentation"></span> )
            </template>
        </span>
    </li>
</template>

<script>
 import {preparedTask} from "@/helpers/preparedTask";

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
            vTask: null,
            statusLists: [
                'Проверена',
                'В релиз',
                'Мастер тестирование'
            ],
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

<style scoped>
    .task {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
    }
    .task-id {
        white-space: nowrap;
    }
    li {
        list-style-type: none;
    }
    .dotted:nth-child(2) {
        flex: 1 0;
        border-bottom: 1px dotted #000;
        height: 1em;
        margin: 0 .4em;
    }
</style>