export default function getselecttime(y, m, d) {
    let year = parseInt(y);
    let month = parseInt(m - 1);
    let day = parseInt(d);    
    return new Date(year, month, day).getTime();
}