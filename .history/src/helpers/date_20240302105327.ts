

// export const addDays = (v: number, nextDate = new Date()): number => {
export const addDays = (v: number, current = Date.now()): number => {
    const nextDate = new Date(current)
    nextDate.setDate(nextDate.getDate() + v)
    return nextDate.getTime()
}

// export const daysElapsed = (v: number) => {

//     return 0

  
// }
