<template>
    <li>
        {{ task.idReadable }} {{ task.summary }} ( {{ typeTask }} ) ( {{ ratingTask }} )
    </li>
</template>

<script>
export default {
    name: 'jfTask',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
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
        ratingTask() {
            let rating = '';

            return rating
        }
    },
    mounted() {},
    methods: {}
}
</script>