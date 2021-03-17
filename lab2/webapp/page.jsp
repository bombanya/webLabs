<%@ page import="java.util.HashSet" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fn" uri = "http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<c:if test="${fn:contains(applicationScope['accessSet'], pageContext.session.id)}">
    <!DOCTYPE html>
    <html>
    <head>
        <title>Лабка 2</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="styles.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="scripts.js"></script>
    </head>
    <body>
    <table id="mainTable">
        <caption id="header">
            <p>Прошкин Никита</p>
            <p>Группа: P3231</p>
            <p>Вариант: 3828</p>
        </caption>

        <tr>
            <td id="formCell">
                <form id="form">
                    <table>
                        <tr>
                            <td id="radiusTd">
                                <div id="radiusDiv">
                                    Радиус R:
                                    <p><label><input type="checkbox" class="chb" value="1"/>1</label></p>
                                    <p><label><input type="checkbox" class="chb" value="1.5"/>1.5</label></p>
                                    <p><label><input type="checkbox" class="chb" value="2"/>2</label></p>
                                    <p><label><input type="checkbox" class="chb" value="2.5"/>2.5</label></p>
                                    <p><label><input type="checkbox" class="chb" value="3"/>3</label></p>
                                </div>
                            </td>

                            <td class="non-displayedMessage" id="radiusError">
                                <img class="excl" src="excl.png" alt="invalid">Должен быть выбран радиус
                            </td>
                        </tr>
                    </table>


                    <table id="buttonTable">
                        <tr>
                            <td id="xTd">
                                <div id="radioDiv">
                                    <p>Координата X:</p>
                                    <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-4">-4</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-3">-3</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-2">-2</label></p>
                                    <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="-1">-1</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="0">0</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="1">1</label></p>
                                    <p><label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="2">2</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="3">3</label>
                                        <label class="radioLabel"><input type="radio" class="xRadio" name="xRadio" value="4">4</label></p>
                                </div>
                            </td>

                            <td class="non-displayedMessage" id="xError" >
                                <img class="excl" src="excl.png" alt="invalid">Необходимо выбрать значение
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

                            <td class="non-displayedMessage" id="yError">
                                <img class="excl" src="excl.png" alt="invalid"><span id="yErrorMessage"></span>
                            </td>
                        </tr>
                    </table>

                    <div id="submitSpan">
                        <input id="submit" type="submit">
                    </div>
                </form>
            </td>

            <td id="imgPart">

                <svg id="svg" width="520" height="520">
                    <marker id="arrow" refX="3" refY="3" markerWidth="6"
                            markerHeight="6" orient="auto">
                        <path d="M 0 0 L 6 3 0 6 z"></path>
                    </marker>

                    <circle id="zoneCircle" r="37" cx="255" cy="255" fill="#818AEC" stroke-width="0"></circle>
                    <rect id="whiteRect" x="255" y="255" height="74" width="74" fill="white"></rect>
                    <rect id="zoneRect" x="181" y="255" width="74" height="74" fill="#818AEC"
                          stroke-width="0"></rect>

                    <path id="zoneTriangle" d="M 255 255 L 255 181 181 255 z" fill="#818AEC" stroke-width="0"></path>

                    <line id="lineY" x1="255" y1="515" x2="255" y2="5"
                          stroke="black" stroke-width="2" marker-end="url(#arrow)"></line>
                    <line id="lineX" x1="5" y1="255" x2="515" y2="255"
                          stroke="black" stroke-width="2" marker-end="url(#arrow)"></line>
                    <text x="245" y="275" font-size="15" >0</text>
                    <text x="505" y="245" font-size="16" >X</text>
                    <text id="posX" x="329" y="245" font-size="14" >R</text>
                    <text id="posX/2" x="292" y="245" font-size="14" >R/2</text>
                    <line id="posXLine" x1="329" y1="247" x2="329" y2="263"
                          stroke="black" stroke-width="2"></line>
                    <line id="posX/2Line" x1="292" y1="247" x2="292" y2="263"
                          stroke="black" stroke-width="2"></line>

                    <text id="negX" x="181" y="245" font-size="14" >-R</text>
                    <text id="negX/2" x="218" y="245" font-size="14" >-R/2</text>
                    <line id="negXLine" x1="181" y1="247" x2="181" y2="263"
                          stroke="black" stroke-width="2"></line>
                    <line id="negX/2Line" x1="218" y1="247" x2="218" y2="263"
                          stroke="black" stroke-width="2"></line>

                    <text x="265" y="20" font-size="16" >Y</text>
                    <text id="posY" x="265" y="181" font-size="14" >R</text>
                    <text id="posY/2" x="265" y="218" font-size="14" >R/2</text>
                    <line id="posYLine" x1="247" y1="181" x2="263" y2="181"
                          stroke="black" stroke-width="2"></line>
                    <line id="posY/2Line" x1="247" y1="218" x2="263" y2="218"
                          stroke="black" stroke-width="2"></line>

                    <text id="negY" x="265" y="329" font-size="14" >-R</text>
                    <text id="negY/2" x="265" y="292" font-size="14" >-R/2</text>
                    <line id="negYLine" x1="247" y1="329" x2="263" y2="329"
                          stroke="black" stroke-width="2"></line>
                    <line id="negY/2Line" x1="247" y1="292" x2="263" y2="292"
                          stroke="black" stroke-width="2"></line>
                    <circle r="5" id="newDot" fill="none"></circle>

                    <c:forEach items="${table}" var="row">
                        <c:if test="${row.boolResult}">
                            <circle r="5" fill="red" cx="${row.x * 74 + 255}"
                                    cy="${-row.y * 74 + 255}"></circle>
                        </c:if>
                    </c:forEach>
                </svg>
                <p id="mouseCoord">Выберите значение радиуса</p>
            </td>

            <td id="tablePart">
                <div id="lastResult">
                    Введите координаты точки и радиус
                </div>
                <table id="tableWithResults">
                    <thead>
                    <tr>
                        <th>Дата и время запроса</th><th>Время работы скрипта</th>
                        <th>R</th><th>X</th><th>Y</th>
                        <th>Результат</th>
                    </tr>
                    </thead>

                    <tbody>
                    <c:forEach items="${table}" var="row">
                        <tr>
                            <td><c:out value="${row.timeOfRequest}"/></td>
                            <td><c:out value="${row.workTime}"/></td>
                            <td><c:out value="${row.r}"/></td>
                            <td><c:out value="${row.x}"/></td>
                            <td><c:out value="${row.y}"/></td>
                            <td><c:out value="${row.result}"/></td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
    </body>
    </html>
    <%((HashSet)application.getAttribute("accessSet")).remove(session.getId());%>
</c:if>
