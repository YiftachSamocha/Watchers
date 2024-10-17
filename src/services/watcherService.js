import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const watcherService = {
    query,
    save,
    remove,
    getById,
    getEmptyWatcher,
    tryWatcher
}

const movieNames = [
    "Inception",
    "The Dark Knight",
    "Forrest Gump",
    "The Shawshank Redemption",
    "Pulp Fiction",
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Matrix",
    "Fight Club",
    "Interstellar",
    "The Godfather",
    "The Social Network",
    "The Silence of the Lambs",
    "Gladiator",
    "Schindler's List",
    "The Departed",
    "The Prestige",
    "The Lion King",
    "Saving Private Ryan",
    "Avatar",
    "Jurassic Park",
    "Titanic",
    "The Avengers",
    "The Wizard of Oz",
    "Spider-Man: Into the Spider-Verse",
    "Black Panther",
    "Coco",
    "Inside Out",
    "Zootopia",
    "The Shape of Water",
    "Parasite"
]


const fullNames = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "David Wilson",
    "Sarah Brown",
    "James Jones",
    "Mary Garcia",
    "Robert Martinez",
    "Linda Rodriguez",
    "William Hernandez",
    "Elizabeth Lopez",
    "Charles Gonzalez",
    "Patricia Perez",
    "Thomas Wilson",
    "Jennifer Lee",
    "Christopher Anderson",
    "Jessica Taylor",
    "Daniel Thomas",
    "Laura Moore",
    "Matthew Jackson",
    "Barbara Martin",
    "Anthony White",
    "Karen Thompson",
    "Mark Lee",
    "Nancy Harris",
    "Kevin Clark",
    "Helen Lewis",
    "Brian Robinson",
    "Sandra Walker",
    "Jason Hall"
]

export function getMovies() {
    const movies = movieNames.map(movie => {
        return { name: movie, isWatched: false }
    })
    return movies
}

const STORAGE_KEY = 'watchers'

var gWatchers = _loadWatchers()

function query(filterBy) {
    let watchersToReturn = gWatchers
    return Promise.resolve([...watchersToReturn])
}
function tryWatcher(id) {
    const watcher = gWatchers.find(watcher => watcher._id === id)
    watcher.batteryStatus -= 10
    return Promise.resolve()
}
function getById(id) {
    const watcher = gWatchers.find(watcher => watcher._id === id)
    return Promise.resolve({ ...watcher })
}

function remove(id) {
    const idx = gWatchers.findIndex(watcher => watcher._id === id)
    gWatchers.splice(idx, 1)
    if (!gWatchers.length) gWatchers = gDefaultWatchers.slice()
    storageService.store(STORAGE_KEY, gWatchers)
    return Promise.resolve()
}

function save(watcherToSave) {
    if (watcherToSave._id) {
        const idx = gWatchers.findIndex(watcher => watcher._id === watcherToSave._id)
        gWatchers.splice(idx, 1, watcherToSave)
    } else {
        watcherToSave._id = makeId()
        gWatchers.push(watcherToSave)
    }
    storageService.store(STORAGE_KEY, gWatchers)
    return Promise.resolve(watcherToSave)
}


function getEmptyWatcher() {
    return {
        model: '',
        type: ''
    }
}




function createWatchers() {
    const result = []

    for (let i = 0; i < 10; i++) {
        const randomName = fullNames[Math.floor(Math.random() * fullNames.length)]
        const randomMovies = []

        // Get 3 unique random movies
        while (randomMovies.length < 3) {
            const randomMovie = movieNames[Math.floor(Math.random() * movieNames.length)];
            if (!randomMovies.includes(randomMovie)) {
                randomMovies.push(randomMovie);
            }
        }

        // Generate a random ID
        const randomId = makeId()

        // Create the object
        const obj = {
            name: randomName,
            movies: randomMovies,
            _id: randomId
        }

        result.push(obj)
    }

    return result
}

function _loadWatchers() {
    let watchers = storageService.load(STORAGE_KEY)
    if (!watchers || !watchers.length) watchers = createWatchers()
    storageService.store(STORAGE_KEY, watchers)
    return watchers
}

