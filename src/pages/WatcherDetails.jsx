import React from "react"
import { connect } from "react-redux"
import { loadWatcher } from "../store/actions/watcher.actions"
import { Link } from "react-router-dom"
import { WithParams } from "../cmps/WithParams"

class _WatcherDetails extends React.Component {
    state = {
        currId: null,
    }
    componentDidMount() {
        this.setWatcher()
    }
   
    setWatcher() {
        const { id } = this.props.params
        this.setState({ currId: id })
        loadWatcher(id)

    }
    render() {
        const { selectedWatcher } = this.props
        if (!selectedWatcher) return <div>Loading...</div>
        return <section className="watcher-details">
            <h1>{selectedWatcher.name}</h1>
            <div>
                {selectedWatcher.movies.map(movie => {
                    return <div>{movie}</div>
                })}
            </div>
            <Link to={"/"}>Go back</Link>
        </section>
    }
}
const mapStateToProps = state => ({
    watchers: state.watcherModule.watchers,
    selectedWatcher: state.watcherModule.selectedWatcher
})

export const WatcherDetails = connect(mapStateToProps)(WithParams(_WatcherDetails))

