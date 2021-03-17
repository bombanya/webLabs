<!DOCTYPE html>
<html>
<head>
    <title>Лабка 1</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="scripts.js"></script>
    <?php session_start(); ?>
</head>
<body>
<table id="mainTable">
    <caption id="header">
        <p>Прошкин Никита</p>
        <p>Группа: N3248</p>
        <p>Вариант: 5029</p>
    </caption>

    <tr>
        <td id="formCell">
            <form id="form">
                <div id="radiusDiv">
                    Радиус R:
                    <select id="radius">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <table id="buttonTable">
                    <tr>
                        <td>
                            <div>
                                <fieldset id="buttons">
                                    <legend>Координата X</legend>
                                    <p><input type="button" value="-4" onclick="clickTheButton(-4, this)" >
                                        <input type="button" value="-3" onclick="clickTheButton(-3, this)">
                                        <input type="button" value="-2" onclick="clickTheButton(-2, this)"></p>

                                    <p><input type="button" value="-1" onclick="clickTheButton(-1, this)">
                                        <input type="button" value="0" onclick="clickTheButton(0, this)">
                                        <input type="button" value="1" onclick="clickTheButton(1, this)"></p>

                                    <p><input type="button" value="2" onclick="clickTheButton(2, this)">
                                        <input type="button" value="3" onclick="clickTheButton(3, this)">
                                        <input type="button" value="4" onclick="clickTheButton(4, this)"></p>
                                </fieldset>
                            </div>
                        </td>

                        <td class="non-displayedMessage" id="buttonsError" >
                            <img src="excl.png">Необходимо выбрать значение
                        </td>
                    </tr>
                </table>

                <table id="textTable">
                    <tr>
                        <td id="textCell">
                            <div>
                                Координата Y:
                                <input type="text" id="coordY" onkeyup="yCoordValidator(this)" required>
                            </div>
                        </td>

                        <td class="non-displayedMessage" id="textError">
                            <img src="excl.png"><span id="textErrorMessage"></span>
                        </td>
                    </tr>
                </table>

                <div id="submitSpan">
                    <input id="submit" type="submit">
                </div>
            </form>
        </td>

        <td id="imgPart">
            <div>
                <img src="areas.png" >
            </div>
        </td>

        <td id="tablePart">
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
        </td>
    </tr>
</table>
</body>
</html>