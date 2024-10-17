import React from "react"
import { connect } from "react-redux"
import { WatcherPreview } from "./WatcherPreview"
import { loadWatchers } from "../store/actions/watcher.actions"
class _WatcherList extends React.Component {
    componentDidMount() {
        loadWatchers()
    }
    render() {
        const { watchers } = this.props
        if (!watchers) return <div>No watchers...</div>
        return <section className="watcher-list" >
            {watchers.map(watcher => {
                return <WatcherPreview watcher={watcher} key={watcher._id}/>
            })}
        </section>
    }

}
const mapStateToProps = state => ({
    watchers: state.watcherModule.watchers,
    filterBy: state.watcherModule.filterBy
})

export const WatcherList = connect(mapStateToProps)(_WatcherList)