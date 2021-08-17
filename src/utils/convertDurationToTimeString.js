export function convertDurationToTimeString(duration) {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor(duration % 3600 / 60)
    const seconds = duration % 60

    const timeFinally = [hours, minutes, seconds]
            .map( time => String(time).padStart(2, '0'))
            .join(':')

    return timeFinally
}