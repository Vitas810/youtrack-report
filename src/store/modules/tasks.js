import getTasksApi from '@/api/tasks'

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const mutationTypes = {
    getTasksStart: '[tasks] Get tasks start',
    getTasksSuccess: '[tasks] Get tasks success',
    getTasksFailure: '[tasks] Get tasks Failure'
}

export const actionTypes = {
    getTasks: '[tasks] Get tasks'
}

const mutations = {
    [mutationTypes.getTasksStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getTasksSuccess](state, payload) {
        state.isLoading = false,
        state.data = payload
    },
    [mutationTypes.getTasksFailure](state) {
        state.isLoading = false
    }
}

const actions = {
    [actionTypes.getTasks](context, {url}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getTasksStart)
            getTasksApi
                .getTasks(url)
                .then((tasks) => {
                    const listTasks = {
                        onGradeTask: [],
                        gradeTask: [],
                        performance: [],
                        inWork: [],
                        test: [],
                        verified: [],
                        release: [],
                        masterTest: [],
                        priority: [],
                    }
                    tasks && tasks.forEach(task => {
                            task.customFields.forEach(customFields => {
                                if (customFields.name && customFields.name === 'Priority') {
                                    if (!customFields.value) return
                                    if (customFields.value.name !== 'Normal') {
                                        listTasks.priority.push(task)
                                    }
                                }

                                if (customFields.name && customFields.name === 'State') {
                                    if (!customFields.value) return
                                    if (listTasks.priority.includes(task)) return

                                    switch (customFields.value.name) {
                                        case 'На оценке':
                                            listTasks.onGradeTask.push(task)
                                            break
                                        case 'Оценено':
                                            listTasks.gradeTask.push(task)
                                            break
                                        case 'К выполнению':
                                            listTasks.performance.push(task)
                                            break
                                        case 'В работе':
                                            listTasks.inWork.push(task)
                                            break
                                        case 'Тестирование':
                                            listTasks.test.push(task)
                                            break
                                        case 'Проверена':
                                            listTasks.verified.push(task)
                                            break
                                        case 'В релиз':
                                            listTasks.release.push(task)
                                            break
                                        case 'Мастер тестирование':
                                            listTasks.masterTest.push(task)
                                            break
                                    }
                                }
                            })
                    })
                    context.commit(mutationTypes.getTasksSuccess, listTasks)
                    resolve(listTasks)
                })
                .catch(() => {
                    context.commit(mutationTypes.getTasksFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}