// Custom event bus
Window.events = [];
export const emit = (name, data = null) => {
    Window.events.forEach(event => {
        if (event.name == name) {
            event.callback(data);
        }
    })
}

export const on = (name, callback) => {
    Window.events.push({
        name,
        callback
    })
}
