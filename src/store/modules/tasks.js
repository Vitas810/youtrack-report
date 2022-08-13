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
                    context.commit(mutationTypes.getTasksSuccess, tasks)
                    resolve(tasks)
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