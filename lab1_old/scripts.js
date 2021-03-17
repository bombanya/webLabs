let x;
function clickTheButton(newX, button){
    if (document.getElementById("clickedButton") != null) {
        document.getElementById("clickedButton").id = null;
    }
    document.getElementById("buttonsError").className = "non-displayedMessage";
    x = newX;
    button.id = "clickedButton";
}

let lastValidY = "";
function yCoordValidator(field){
    let textError = document.getElementById("textError")
    let textErrorMessage = document.getElementById("textErrorMessage");
    let parsedField = field.value.match(/[-+]?(0[.,]\d*|[1-9]\d*[.,]?\d*|0)/);
    if (field.value === "+" || field.value === "-" ||
        (parsedField != null && field.value.length <= 30
        && parsedField[0].length === field.value.length)){
        if (!isNaN(parseFloat(field.value)) &&
            (parseFloat(field.value) <= -3 || parseFloat(field.value) >= 3)){
            textError.className = "displayedMessage";
            textErrorMessage.innerText = "Y может принимать значения в интервале (-3;3)";
            field.value = lastValidY;
        }
        else {
            lastValidY = field.value;
            textError.className = "non-displayedMessage";
        }

    }
    else{
        textError.className = "displayedMessage";
        if (field.value.length === 0){
            textErrorMessage.innerText = "Координата не может быть пустым значением";
            lastValidY = "";
        }
        else if (field.value.length > 30){
            textErrorMessage.innerText = "Слишком длинное значение";
        }
        else{
            textErrorMessage.innerText = "Здесь должна быть обычная чиселка";
        }
        field.value = lastValidY;
    }
}

$(document).ready(function(){
    $("#form").submit(function (event){
        let r = document.getElementById("radius").value;
        let y = document.getElementById("coordY").value.replace(/,/g, ".");
        if (x == null) {
            document.getElementById("buttonsError").className = "displayedMessage";
        }
        else if (y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/) == null ||
            y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/)[0].length !== y.length){
            document.getElementById("textError").className = "displayedMessage";
            document.getElementById("textErrorMessage").innerText = "Здесь должна быть обычная чиселка";
        }
        else{
            $("#submit").prop("disabled", true);
            $.ajax({
                url: "hitChecker.php",
                data: {
                    r: r,
                    x: x,
                    y: y
                },
                type: "POST",
                dataType: "json"
            })
                .done(function (json){
                    document.getElementById("lastResult").innerText = json.result;
                    let newRow = $('<tr>').append(
                        $('<td>').text(json.timeOfRequest),
                        $('<td>').text(json.workTime),
                        $('<td>').text(json.r),
                        $('<td>').text(json.x),
                        $('<td>').text(json.y),
                        $('<td>').text(json.result)
                    );
                    newRow.appendTo('#tableWithResults');
                    document.getElementById("coordY").value = "";
                })
                .always(function(){
                    $("#submit").prop("disabled", false);
                })
        }
        event.preventDefault();
    })
})