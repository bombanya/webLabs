function clockmaker(){
    let date = new Date();

    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    document.getElementById("time").innerText = hours + ":" + minutes + ":" + seconds;
    document.getElementById("date").innerText = day + "." + month + "." + year;

    setTimeout(function () {clockmaker()}, 8000);
}