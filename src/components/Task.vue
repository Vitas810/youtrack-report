<template>
    <li>
        {{ task.idReadable }}
        {{ task.summary }}
        ( <b>{{ typeTask }}</b> )
        || <b>{{ presentation }}</b>
    </li>
</template>

<script>
import axios from "@/api/axios";

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
            url: '?fields=id,name,value(id,name,presentation)',
            listPresentation: null
        }
    },
    computed: {
        typeTask() {
            let type = '';
            this.task.customFields.forEach(customFields => {
                if (customFields.name && customFields.name === 'State') {
                    if (!customFields.value) return
                    type = customFields.value.name
                }
            })
            return type
        },
        priorityTask() {
            let priority = '';
            this.task.customFields.forEach(customFields => {
                if (customFields.name && customFields.name === 'Priority') {
                    if (!customFields.value) return
                    priority = customFields.value.name
                }
            })
            return priority
        },
        presentation() {
            if (!this.listPresentation) return ''
            let presentation = null
            this.listPresentation && Object.values(this.listPresentation).forEach(item => {
                if (item && item.$type == "PeriodValue") {
                    presentation = item.presentation
                }
            })
            return presentation
        }
    },
    mounted() {
        this.getCustomFields()
    },
    methods: {
        getCustomFields() {
            let typePresentation = ''
            switch (this.task.project.shortName) {
                case 'LK':
                    typePresentation = '130-43'
                    break
                case 'API':
                    typePresentation = '130-45'
                    break
                case 'JILFOND':
                    typePresentation = '130-46'
                    break
                case 'JILFOND3':
                    typePresentation = '130-47'
                    break
                case 'MY_JILFOND':
                    typePresentation = '130-48'
                    break
                default:
                    typePresentation = '130-43'
            }

            try {
                axios.get(`issues/${this.task.id}/fields/${typePresentation}${this.url}`)
                    .then(response => {
                        this.listPresentation = response.data
                        this.preparedTask()
                    })
            } catch (e) {
                console.log(e)
            }
        },
        preparedTask() {
            this.$emit('prepared_task', {
                id: this.task.idReadable,
                description: this.task.summary,
                type: this.typeTask,
                presentation: this.presentation,
                priority: this.priorityTask
            })
        }
    },
}
</script>