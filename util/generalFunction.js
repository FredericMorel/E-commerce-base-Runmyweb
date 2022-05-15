function generateReference(reference) { 
    let date=new Date();
    let day=date.getDate();
    let month=date.getMonth()+1;
    let year=date.getFullYear();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    let millisecond=date.getMilliseconds();
    let random=Math.floor(Math.random()*1000);
    let myReference=day+"-"+month+"-"+year+"-"+hour+"-"+minute+"-"+second+"-"+millisecond+"-"+random;
    return myReference;
}


