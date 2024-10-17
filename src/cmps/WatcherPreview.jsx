import React from "react";
import { getRandomProfileImage } from "../services/utilService";
import { removeWatcher } from "../store/actions/watcher.actions";
import { Link } from "react-router-dom";

export class WatcherPreview extends React.Component {
    state = {
        imgUrl: null
    }
    componentDidMount() {
        getRandomProfileImage()
            .then(url => this.setState({ imgUrl: url }))

    }
    render() {
        const { watcher } = this.props
        const { imgUrl } = this.state

        return <div className="watcher-preview">
            <img src={imgUrl} />
            <p>{watcher.name}</p>
            <hr />
            <div>
                <Link to={`watcher/${watcher._id}`}><button><i className="fa-solid fa-info"></i></button></Link>
                <Link to={`watcher/edit/${watcher._id}`}><button><i className="fa-regular fa-pen-to-square"></i></button></Link>
                <button onClick={() => removeWatcher(watcher._id)}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    }
}