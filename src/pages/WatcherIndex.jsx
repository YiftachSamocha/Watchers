import React from "react"
import { connect } from "react-redux"
import { WatcherList } from "../cmps/WatcherList"
import { loadWatchers } from "../store/actions/watcher.actions"
import { Link } from "react-router-dom"

class _WatcherIndex extends React.Component {

    render() {
        return <section className="watcher-index">
            <h1>Watcher App</h1>
            <Link to={"watcher/edit/"}> <button className="add-btn">Add watcher</button></Link>
            <WatcherList />
        </section>
    }
}
const mapStateToProps = state => ({
    watchers: state.watcherModule.watchers,
    filterBy: state.watcherModule.filterBy
})

export const WatcherIndex = connect(mapStateToProps)(_WatcherIndex)