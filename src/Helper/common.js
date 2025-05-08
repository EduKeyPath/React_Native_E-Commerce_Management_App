export const isValidEmail =(email) =>{
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email));
}

export const isValidMobile =(mobile) =>{
    let pattern = /^[1-9]{1}[0-9]{9}$/;
    return pattern.test(mobile);
}

export const isValidNumber =(mobile) =>{
    return !isNaN(mobile) && Number.isInteger(Number(mobile));
}


export function formatAmount(amount = 0){
    return '$'+amount.toFixed(2)
}