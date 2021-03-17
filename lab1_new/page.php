<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Лабка 1</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="scripts.js"></script>
    <!--<link rel="stylesheet" href="styles.css">-->
    <style>
        body div,
        header {
            text-align: center;
        }

        #header > p{
            font-size: 16px;
            color: #61605f;
            font-family: cursive;
        }

        #form{
            font-family: serif;
        }
        .radioLabel {
            text-align: left;
            display: inline-block;
            width: 45px;
        }

        .non-displayedMessage{
            visibility: collapse;
        }

        .displayedMessage{
            visibility: visible;
        }

        #textTable {
            margin-left: auto;
            margin-right: auto;
        }

        input[type="submit"] {
            width: 100px;
            background-color: #e4373d;
            color: #ffffff;
            margin: 10px;
        }

        #textErrorMessage {
            margin: 10px;
            color: red;
        }

        #excl {
            width: 20px;
            height: 20px;
        }

        #lastResult {
            font-size: 1.1em;
            padding: 10px;
        }

        #tableWithResults {
            border-collapse: collapse;
            font-size: 0.8em;
            font-family: sans-serif;
            width: 50%;
            margin-left: auto;
            margin-right: auto;
        }

        #tableWithResults thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        #tableWithResults th,
        #tableWithResults td {
            padding: 12px 15px;
            height: 10px;
        }

        #tableWithResults tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        #tableWithResults tbody tr:hover {
            color: #009879;
        }
    </style>
    <?php session_start()?>
</head>
<body>
<header id="header">
    <p>Прошкин Никита</p>
    <p>Группа: P3231</p>
    <p>Вариант: 2790</p>
</header>

<div id="formDiv">
    <form id="form">
        <div id="rDiv">
            <p>Радиус R:</p>
            <p><label class="radioLabel"><input type="radio" class="rRadio" name="rRadio" value="1" checked>1</label>
            <p><label class="radioLabel"><input type="radio" class="rRadio" name="rRadio" value="2">2</label>
            <p><label class="radioLabel"><input type="radio" class="rRadio" name="rRadio" value="3">3</label>
            <p><label class="radioLabel"><input type="radio" class="rRadio" name="rRadio" value="4">4</label>
            <p><label class="radioLabel"><input type="radio" class="rRadio" name="rRadio" value="5">5</label>
        </div>

        <div id="xDiv">
            <p>Координата X:</p>
            <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-4" checked>-4</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-3">-3</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-2">-2</label></p>
            <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-1">-1</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="0">0</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="1">1</label></p>
            <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="2">2</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="3">3</label>
                <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="4">4</label></p>
        </div>

        <div id="yDiv">
            <table id="textTable">
                <tr id="textTr">
                    <td id="textCell">
                        <div id="textDiv">
                            Координата Y:
                            <input type="text" id="coordY" onkeyup="yCoordValidator(this)" required>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="non-displayedMessage" id="textError">
                        <img id="excl" src="excl.png"><span id="textErrorMessage"></span>
                    </td>
                </tr>
            </table>
        </div>

        <div id="submitDiv">
            <input id="submit" type="submit">
        </div>
    </form>
</div>

<div id="imgDiv">
    <img src="areas.png">
</div>

<div id="lastResult">
    Введите координаты точки и радиус
</div>

<table id="tableWithResults">
    <thead>
    <tr>
        <th>Дата и время запроса</th><th>Время работы скрипта</th>
        <th>R</th><th>X</th><th>Y</th><th>Результат</th>
    </tr>
    </thead>

    <tbody>
    <?php
    //$_SESSION['table'] = "";
    if (!isset($_SESSION['table'])){
        $_SESSION['table'] = "";
    }
    else echo $_SESSION['table'];
    ?>
    </tbody>
</table>
</body>
</html>