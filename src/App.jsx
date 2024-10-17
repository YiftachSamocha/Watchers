import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { WatcherIndex } from './pages/WatcherIndex'
import { WatcherDetails } from './pages/WatcherDetails'
import { WatcherEdit } from './pages/WatcherEdit'


function App() {
    return (
        <Router>
            <section className="main-app">
                {/* <AppHeader /> */}
                <main className="container">

                    <Routes>
                    <Route path='/' element={<WatcherIndex />} />
                        <Route path='/watcher/:id' element={<WatcherDetails />} />
                        <Route path='watcher/edit/:id?' element={<WatcherEdit />} />
                       
                    </Routes>
                </main>

            </section>
        </Router>
    )
}

export default App
