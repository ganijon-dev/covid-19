export const cx = (classes:string[]) => {
    return classes.join(' ')
}


export const numberFormatter = (number:number|undefined) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const roundNumber = (num:number) => {
    
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
      } else if (num > 1000000) {

        return (Math.round(num / 100000) / 10 + "M");
      } else if (num>1000) {
        return (Math.round(num / 100) / 10 + "K");
      } else {
        return num
      }
}

