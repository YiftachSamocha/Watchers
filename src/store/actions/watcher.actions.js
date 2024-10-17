import { watcherService } from "../../services/watcherService";
import { ADD_WATCHER, REMOVE_WATCHER, SET_FILTER_BY, SET_WATCHER, SET_WATCHERS, UPDATE_WATCHER } from "../reducers/watcher.reducer";
import { store } from "../store";


export async function loadWatchers() {
    try {
        const filterBy = store.getState().watcherModule.filterBy
        const watchers = await watcherService.query()
        const action = {
            type: SET_WATCHERS,
            watchers
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}

export async function removeWatcher(watcherId) {
    try {
        await watcherService.remove(watcherId)
        const action = {
            type: REMOVE_WATCHER,
            watcherId
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}

export async function loadWatcher(watcherId) {
    try {
        const selectedWatcher = await watcherService.getById(watcherId)
        const action = {
            type: SET_WATCHER,
            selectedWatcher
        }
        store.dispatch(action)
        return selectedWatcher
    } catch (error) {
        console.log('error:', error)
    }
}

export async function SaveWatcher(watcherToSave) {
    try {
        const watcher = await watcherService.save(watcherToSave)
        const action = {
            type: watcherToSave._id ? UPDATE_WATCHER : ADD_WATCHER,
            watcher
        }
        store.dispatch(action)
        return watcher
    } catch (error) {
        console.log('error:', error)
    }
}

export async function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
