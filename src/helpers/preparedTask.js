import axios from "@/api/axios";

const typeTask = (task) => {
    let type = '';
    task.customFields.forEach(customFields => {
        if (customFields.name && customFields.name === 'State') {
            if (!customFields.value) return
            type = customFields.value.name
        }
    })

    return type
}

const priorityTask = (task) => {
    let priority = '';
    task.customFields.forEach(customFields => {
        if (customFields.name && customFields.name === 'Priority') {
            if (!customFields.value) return
            priority = customFields.value.name
        }
    })
    return priority
}

const presentation = (listPresentation) => {
    if (!listPresentation) return ''
    let presentation = null
    listPresentation && Object.values(listPresentation).forEach(item => {
        if (item && item.$type == "PeriodValue") {
            presentation = item.presentation
        }
    })
    return presentation
}

const getCustomFields = (task) => {
    return new Promise((resolve) => {
        const url = '?fields=id,name,value(id,name,presentation)'
        let typePresentation = ''

        switch (task.project.shortName) {
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

        axios.get(`issues/${task.id}/fields/${typePresentation}${url}`)
            .then(response => {
                resolve(response.data)
            })
    })
}

export const preparedTask = task => {
    return getCustomFields(task).then(res => {
        return {
            id: task.idReadable,
            description: task.summary,
            type: typeTask(task),
            presentation: presentation(res),
            priority: priorityTask(task)
        }
    })
}

