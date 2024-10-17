export const SET_WATCHERS = 'SET_WATCHERS'
export const ADD_WATCHER = 'ADD_WATCHER'
export const REMOVE_WATCHER = 'REMOVE_WATCHER'
export const UPDATE_WATCHER = 'UPDATE_WATCHER'
export const SET_WATCHER= 'SET_WATCHER'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    watchers: [],
    selectedWatcher: null
}

export function watcherReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_WATCHERS:
            return {
                ...state,
                watchers: action.watchers
            }
        case SET_WATCHER:
            return {
                ...state,
                selectedWatcher: action.selectedWatcher
            }
        
        case ADD_WATCHER:
            return {
                ...state,
                watchers: [...state.watchers, action.watcher]
            }
        case REMOVE_WATCHER:
            return {
                ...state,
                watchers: state.watchers.filter(watcher => watcher._id !== action.watcherId)
            }
        case UPDATE_WATCHER:
            return {
                ...state,
                watchers: state.watchers.map(watcher => watcher._id === action.watcher._id ? action.watcher : watcher)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}