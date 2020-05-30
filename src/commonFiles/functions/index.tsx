export const cx = (classes:string[]) => {
    return classes.join(' ')
}
export const numberFormatter = (number:number|undefined) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}