let lastValidY = "";
function yCoordValidator(field){
    let textError = document.getElementById("yError")
    let textErrorMessage = document.getElementById("yErrorMessage");
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
    replaceNewDot();
}

function replaceNewDot(){
    let r = $(".chb:checked").val();
    let x = $(".xRadio:checked").val();
    let y = $("#coordY").val().replace(/,/g, ".");

    if (x !== undefined && r !== undefined &&
        y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/) != null &&
        y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/)[0].length === y.length){
        let cx = (x*74 + 255).toString();
        let cy = (-y*74 + 255).toString();
        document.getElementById("newDot").setAttribute("cx", cx);
        document.getElementById("newDot").setAttribute("cy", cy);
        document.getElementById("newDot").setAttribute("fill", "#6dec56");
    }
    else document.getElementById("newDot").setAttribute("fill", "none");
}

function callAjaxChecker(x, y, r){
    $("#submit").prop("disabled", true);
    $.ajax({
        url: "lab2",
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
                $('<td>').text(r),
                $('<td>').text(x),
                $('<td>').text(y),
                $('<td>').text(json.result)
            );
            newRow.appendTo('#tableWithResults');
            if (json.boolResult){
                let dot = document.getElementById("newDot").cloneNode(false);
                dot.setAttribute("cx", (x*74 + 255).toString());
                dot.setAttribute("cy", (-y*74 + 255).toString());
                dot.setAttribute("fill", "red");
                document.getElementById("svg").appendChild(dot);
            }
        })
        .always(function(){
            $("#submit").prop("disabled", false);
        })
}

$(document).ready(function (){
    $("#svg").mousemove(function (event){
        if ($(".chb:checked").val() !== undefined) {
            let xFromMouse = (event.pageX - $("#svg").offset().left - 255) / 74;
            let yFromMouse = -(event.pageY - $("#svg").offset().top - 255) / 74;
            document.getElementById("mouseCoord").innerHTML = "Координаты точки: x: " +
                "<span id='mouseX'>" + xFromMouse.toFixed(2) + "</span>; y: <span id='mouseY'>"
                + yFromMouse.toFixed(2) + "</span>";
        }
    })

    $("#svg").click(function (event){

        if ($(".chb:checked").val() !== undefined){
            callAjaxChecker(((event.pageX - $("#svg").offset().left - 255) / 74).toFixed(2),
                (-(event.pageY - $("#svg").offset().top - 255) / 74).toFixed(2),
                $(".chb:checked").val());
        }
        else document.getElementById("radiusError").className = "displayedMessage";
    })

    $(".chb").change(function() {
        $(".chb").prop("checked", false);
        $(this).prop("checked", true);
        let r = $(this).attr("value");
        document.getElementById("radiusError").className = "non-displayedMessage";
        document.getElementById("svg").setAttribute( "class","readyForClicking");

        document.getElementById("zoneCircle").setAttribute("r", (r * 37).toString());
        document.getElementById("whiteRect").setAttribute("height",(r * 74).toString());
        document.getElementById("whiteRect").setAttribute("width",(r * 74).toString());
        document.getElementById("zoneRect").setAttribute("x", (255 - r*74).toString());
        document.getElementById("zoneRect").setAttribute("width",  (r * 74).toString());
        document.getElementById("zoneRect").setAttribute("height", (r * 74).toString());
        document.getElementById("zoneTriangle").setAttribute("d", "M 255 255 L 255 "
            + (255 - r * 74) + " " + (255 - r * 74) + " 255 z");

        document.getElementById("posX").setAttribute("x", (255 + 74*r).toString());
        document.getElementById("posX/2").setAttribute("x", (255 + 37*r).toString());
        document.getElementById("posXLine").setAttribute("x1", (255 + 74*r).toString());
        document.getElementById("posXLine").setAttribute("x2", (255 + 74*r).toString());
        document.getElementById("posX/2Line").setAttribute("x1", (255 + 37*r).toString());
        document.getElementById("posX/2Line").setAttribute("x2", (255 + 37*r).toString());
        document.getElementById("posX").textContent = r;
        document.getElementById("posX/2").textContent = (r/2).toString();

        document.getElementById("negX").setAttribute("x", (255 - 74*r).toString());
        document.getElementById("negX/2").setAttribute("x", (255 - 37*r).toString());
        document.getElementById("negXLine").setAttribute("x1", (255 - 74*r).toString());
        document.getElementById("negXLine").setAttribute("x2", (255 - 74*r).toString());
        document.getElementById("negX/2Line").setAttribute("x1", (255 - 37*r).toString());
        document.getElementById("negX/2Line").setAttribute("x2", (255 - 37*r).toString());
        document.getElementById("negX").textContent = (-r).toString();
        document.getElementById("negX/2").textContent = (-r/2).toString();

        document.getElementById("posY").setAttribute("y", (255 - 74*r).toString());
        document.getElementById("posY/2").setAttribute("y", (255 - 37*r).toString());
        document.getElementById("posYLine").setAttribute("y1", (255 - 74*r).toString());
        document.getElementById("posYLine").setAttribute("y2", (255 - 74*r).toString());
        document.getElementById("posY/2Line").setAttribute("y1", (255 - 37*r).toString());
        document.getElementById("posY/2Line").setAttribute("y2", (255 - 37*r).toString());
        document.getElementById("posY").textContent = r;
        document.getElementById("posY/2").textContent = (r/2).toString();

        document.getElementById("negY").setAttribute("y", (255 + 74*r).toString());
        document.getElementById("negY/2").setAttribute("y", (255 + 37*r).toString());
        document.getElementById("negYLine").setAttribute("y1", (255 + 74*r).toString());
        document.getElementById("negYLine").setAttribute("y2", (255 + 74*r).toString());
        document.getElementById("negY/2Line").setAttribute("y1", (255 + 37*r).toString());
        document.getElementById("negY/2Line").setAttribute("y2", (255 + 37*r).toString());
        document.getElementById("negY").textContent = (-r).toString();
        document.getElementById("negY/2").textContent = (-r/2).toString();
        replaceNewDot();
    });

    $("input[name=xRadio]").change(function (){
        document.getElementById("xError").className = "non-displayedMessage";
        replaceNewDot();
    })

    $("#form").submit(function (event){
        let r = $(".chb:checked").val();
        let x = $(".xRadio:checked").val();
        let y = $("#coordY").val().replace(/,/g, ".");

        if (r === undefined) document.getElementById("radiusError").className = "displayedMessage";
        else if (x === undefined) document.getElementById("xError").className = "displayedMessage";
        else if (y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/) == null ||
            y.match(/[-+]?(0|[1-9]\d*)([.,]\d+)?/)[0].length !== y.length){
            document.getElementById("textError").className = "displayedMessage";
            document.getElementById("textErrorMessage").innerText = "Здесь должна быть обычная чиселка";
        }
        else callAjaxChecker( x, y, r);
        event.preventDefault();
    })
})