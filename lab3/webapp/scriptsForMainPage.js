function createNewDot(x, y, boolResult){
    let dot = document.getElementById("newDot").cloneNode(false);
    dot.setAttribute("cx", (x * 45 + 280).toString());
    dot.setAttribute("cy", (-y * 45 + 280).toString());
    if (boolResult === "true") dot.setAttribute("fill", "green");
    else dot.setAttribute("fill", "red");
    document.getElementById("svg").appendChild(dot);
}


function formAjaxCreateNewDot(data){
    if (document.getElementById("coordsForm:icewhatswrongwithyou").value === "true") {
        let x = document.getElementById("coordsForm:xValue").innerText;
        let y = document.getElementById("coordsForm:yText").value;
        let boolResult = document.getElementById("clickCoords:clickResult").value;
        createNewDot(x, y, boolResult);
        document.getElementById("coordsForm:icewhatswrongwithyou").value = "false";
    }
}

function clickAjaxCreateDot(){
    let x = document.getElementById("clickCoords:realClickX").value;
    let y = document.getElementById("clickCoords:realClickY").value;
    let boolResult = document.getElementById("clickCoords:clickResult").value;
    createNewDot(x, y, boolResult);
}

function drawDotsFromPreviousSessions(){
    let table = document.getElementById("resultsTable");
    for (let row = 1; row < table.rows.length; row++){
        if (table.rows[row].cells[0].textContent !== ""){
            let x = table.rows[row].cells[3].textContent;
            let y = table.rows[row].cells[4].textContent;
            let boolResult = table.rows[row].cells[6].textContent;
            createNewDot(x, y, boolResult);
        }
    }
}

$(document).ready(function (){
    drawDotsFromPreviousSessions();

    $("#svg").mousemove(function (event){
        let xFromMouse = (event.pageX - $("#svg").offset().left -
            document.getElementById("svg").clientLeft - 280) / 45;
        let yFromMouse = -(event.pageY - $("#svg").offset().top -
            document.getElementById("svg").clientTop - 280) / 45;
        document.getElementById("clickCoords:mouseCoords").innerHTML = "Координаты точки: x: " +
            "<span id='mouseX'>" + xFromMouse.toFixed(2) + "</span>; y: <span id='mouseY'>"
            + yFromMouse.toFixed(2) + "</span>";

        document.getElementById("clickCoords:clickX").value = xFromMouse.toFixed(2);
        document.getElementById("clickCoords:clickY").value = yFromMouse.toFixed(2);

    })

    $("#coordsForm\\:rMenu").change(function (){
        let r = $("#coordsForm\\:rMenu").val();

        document.getElementById("zoneCircle").setAttribute("r", (r * 22.5).toString());
        document.getElementById("whiteRect").setAttribute("x",(280 - r * 45).toString());
        document.getElementById("whiteRect").setAttribute("y",(280 - r * 45).toString());
        document.getElementById("whiteRect").setAttribute("height",(r * 45).toString());
        document.getElementById("whiteRect").setAttribute("width",(r * 45).toString());
        document.getElementById("whiteRect1").setAttribute("x",(280 - r * 45).toString());
        document.getElementById("whiteRect1").setAttribute("height",(r * 45).toString());
        document.getElementById("whiteRect1").setAttribute("width",(r * 45).toString());
        document.getElementById("zoneRect").setAttribute("y", (280 - r*45).toString());
        document.getElementById("zoneRect").setAttribute("width",  (r * 45).toString());
        document.getElementById("zoneRect").setAttribute("height", (r * 45).toString());
        document.getElementById("zoneTriangle").setAttribute("d", "M 280 280 L 280 "
            + (280 + r * 45) + " " + (280 - r * 22.5) + " 280 z");

        document.getElementById("posX").setAttribute("x", (280 + 45*r).toString());
        document.getElementById("posX/2").setAttribute("x", (280 + 22.5*r).toString());
        document.getElementById("posXLine").setAttribute("x1", (280 + 45*r).toString());
        document.getElementById("posXLine").setAttribute("x2", (280 + 45*r).toString());
        document.getElementById("posX/2Line").setAttribute("x1", (280 + 22.5*r).toString());
        document.getElementById("posX/2Line").setAttribute("x2", (280 + 22.5*r).toString());
        document.getElementById("posX").textContent = r;
        document.getElementById("posX/2").textContent = (r/2).toString();

        document.getElementById("negX").setAttribute("x", (280 - 45*r).toString());
        document.getElementById("negX/2").setAttribute("x", (280 - 22.5*r).toString());
        document.getElementById("negXLine").setAttribute("x1", (280 - 45*r).toString());
        document.getElementById("negXLine").setAttribute("x2", (280 - 45*r).toString());
        document.getElementById("negX/2Line").setAttribute("x1", (280 - 22.5*r).toString());
        document.getElementById("negX/2Line").setAttribute("x2", (280 - 22.5*r).toString());
        document.getElementById("negX").textContent = (-r).toString();
        document.getElementById("negX/2").textContent = (-r/2).toString();

        document.getElementById("posY").setAttribute("y", (280 - 45*r).toString());
        document.getElementById("posY/2").setAttribute("y", (280 - 22.5*r).toString());
        document.getElementById("posYLine").setAttribute("y1", (280 - 45*r).toString());
        document.getElementById("posYLine").setAttribute("y2", (280 - 45*r).toString());
        document.getElementById("posY/2Line").setAttribute("y1", (280 - 22.5*r).toString());
        document.getElementById("posY/2Line").setAttribute("y2", (280 - 22.5*r).toString());
        document.getElementById("posY").textContent = r;
        document.getElementById("posY/2").textContent = (r/2).toString();

        document.getElementById("negY").setAttribute("y", (280 + 45*r).toString());
        document.getElementById("negY/2").setAttribute("y", (280 + 22.5*r).toString());
        document.getElementById("negYLine").setAttribute("y1", (280 + 45*r).toString());
        document.getElementById("negYLine").setAttribute("y2", (280 + 45*r).toString());
        document.getElementById("negY/2Line").setAttribute("y1", (280 + 22.5*r).toString());
        document.getElementById("negY/2Line").setAttribute("y2", (280 + 22.5*r).toString());
        document.getElementById("negY").textContent = (-r).toString();
        document.getElementById("negY/2").textContent = (-r/2).toString();
    })

    $("#svg").click(function (){
        document.getElementById("clickCoords:clickButton").click();
    })

    $("#coordsForm\\:rMenu").change(function (){
        document.getElementById("clickCoords:radius").value
            = document.getElementById("coordsForm:rMenu").value;
    })
})