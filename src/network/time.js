export default function(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dates = date.getDate();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    month<10?month='0'+month:month;
    dates<10?dates='0'+dates:dates;
    hours<10?hours='0'+hours:hours;
    minute<10?minute='0'+minute:minute;
    second<10?second='0'+second:second;
    return (year+'-'+month+'-'+dates+' '+hours+':'+minute+':'+second);
}