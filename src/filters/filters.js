const price = (price) => {
    const v = Number(price);
    return !isNaN(v)
        ? v.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD'
        }) : '';
};

const millis = (millis) => {
    
    const v = Number(millis);
    return !isNaN(v)
        ? new Date(v).toLocaleDateString()
        : '';
};

export {
    price,
    millis
}