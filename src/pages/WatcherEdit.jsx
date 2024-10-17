import React from "react"
import { connect } from "react-redux"
import { getMovies } from "../services/watcherService"
import { Link } from "react-router-dom"
import { WithParams } from "../cmps/WithParams"
import { loadWatcher, SaveWatcher } from "../store/actions/watcher.actions"
class _WatcherEdit extends React.Component {
    state = {
        isAdd: true,
        movies: getMovies(),
        currWatcher: null,
        fullname: '',
    }
    componentDidMount() {
        if (!this.props.params.id) {
            SaveWatcher({ name: '', movies: [] })
                .then(watcher => {
                    this.setState({ currWatcher: watcher, isAdd: true })
                })
        }
        else {
            loadWatcher(this.props.params.id)
                .then(watcher => {
                    const newMovies = this.state.movies.map(movie => {
                        if (watcher.movies.some(m => m === movie.name))
                            return { ...movie, isWatched: true }
                        return movie
                    })
                    this.setState({ currWatcher: watcher, isAdd: false, movies: newMovies, fullname: watcher.name })
                })
        }


    }
    watchMovie(name) {
        const newMovies = this.state.movies.map(movie => {
            if (movie.name === name) return { ...movie, isWatched: !movie.isWatched }
            else return movie
        })
        this.setState({ movies: newMovies })
        const moviesToSave = newMovies.filter(movie => movie.isWatched).map(movie => movie.name)
        SaveWatcher({ ...this.state.currWatcher, movies: moviesToSave })
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ fullname: value })
        SaveWatcher({ ...this.state.currWatcher, name: value })
    }

    render() {
        return <section className="watcher-edit">
            <header>
                <Link to={"/"}>Save & Go back</Link>
                <h1>{this.state.isAdd ? 'Add' : 'Edit'} Watcher!</h1>
                <p></p>
            </header>

            <input type="text" placeholder="What's your name?"
                value={this.state.fullname} onChange={this.handleChange} />
            <div>
                {this.state.movies.map(movie => {
                    return <div className={`movie ${movie.isWatched ? 'watch' : ''}`}
                        onClick={() => this.watchMovie(movie.name)}>
                        {movie.name}
                    </div>
                })}
            </div>

        </section>
    }

}
const mapStateToProps = state => ({
    watchers: state.watcherModule.watchers,
    selectedWatcher: state.watcherModule.selectedWatcher
})

export const WatcherEdit = connect(mapStateToProps)(WithParams(_WatcherEdit))