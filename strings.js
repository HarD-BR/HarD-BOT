const play = {
    command: "play",
    name: "song",
    description : "Play the specified song",
    option: "Song name or URL",
    nochannel: "You need to be in a voice channel!",
    noresult: "No result found",
    loading: "Loading song...",
    songadded: " was added to the queue!"
}

const pause = {
    command: "pause",
    description: "Pauses the song",
    notify: "The song has been paused"
}

const shuffle = {
    command: "shuffle",
    description: "Shuffles the current queue",
    notify: "The queue has been shuffled! Total songs: "
}

const skip = {
    command: "skip",
    description: "Skips the current song",
    notify: "The current songs has been skipped!"
}

const skipto = {
    command: "skipto",
    name: "number",
    description: "Skips the current song to a queue number",
    option: "Queue number",
    notify: "Skipping to "
}

const remove = {
    command: "remove",
    description: "Removes the specified track",
    name: "number",
    option: "Number of the song to be removed",
    notify: "Song removed!"
}
const info = {
    command: "info",
    description: "Shows info for current song"
}

const queue = {
    command: "queue",
    name: "page",
    description: "Shows the queue",
    option: "Queue page",
    nosongs: "There's no songs on queue!",
    playing: "Playing now: ",
    nopage: "Invalid page",
    title: "Queue",
    footer: "Page ",
    footer2: " of "
}

const song = {
    duration: "Duration : ",
    requestedby: "Requested by: "
}

const resume = {
    command: "resume",
    description: "Resumes the bot",
    notify: "Bot has been resumed!"
}

const quit = {
    command: "quit",
    description: "Stops the bot",
    exit: "See you later!"
}

const clear = {
    command: "clear",
    description: "Clears the queue",
    notify: "Queue cleared!"
}

const boost = {
    command: "boost",
    description: "Toggle bassboost",
    notify: "Bassboost toggled!"
}

const system = {
    loading: "Loading new commands",
    notfound: "Command not found!",
    success: "Sucess",
    error: "Something went wrong: ",
    logged: "Logged in as ",
    run: "Command: ",
    user: "User: ",
    server: "Server: ",
    invalidopt: "Invalid option"
}

module.exports = {
    play,
    pause,
    shuffle,
    skip,
    skipto,
    remove,
    info,
    queue,
    song,
    resume,
    quit,
    clear,
    boost,
    system
}