const currentDateFormat = () => {
    return new Date('12-31-2020') != 'Invalid Date' ? 'mdy' : 'dmy';
}

const date = (value) => {
    const arr = value.split('/');
    if (value.length !== 10 || arr.length !== 3 || !arr[0] || !arr[1] || !arr[2]) return false;
    
    const d = new Date(value);
    const format = currentDateFormat();
    const day = parseInt(format === 'mdy' ? arr[1] : arr[0]);
    const month = parseInt(format === 'mdy' ? arr[0] : arr[1]);
    
    return d != 'Invalid Date' && d.getDate() === day && d.getMonth() === month - 1;
}

export { date }