package com.bombanya.web2;

import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;

@WebServlet(name = "model", value = "/model")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (((HashSet)getServletContext().getAttribute("accessSet"))
                .contains(req.getSession().getId())) {
            long start = System.nanoTime();
            TableRow rowForSession = new TableRow();
            JSONObject jsonForAjax = new JSONObject();
            HttpSession session = req.getSession();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
            String timeOfRequest = LocalDateTime.now().format(formatter);
            rowForSession.setTimeOfRequest(timeOfRequest);
            jsonForAjax.put("timeOfRequest", timeOfRequest);

            if (session.getAttribute("table") == null) {
                session.setAttribute("table", new ArrayList<TableRow>());
            }

            double r = Double.parseDouble(req.getParameter("r"));
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));

            rowForSession.setX(x);
            rowForSession.setR(r);
            rowForSession.setY(y);

            String result;
            if ((x >= 0 && y >= 0 && (x * x + y * y <= (r * r) / 4)) ||
                    (x <= 0 && y >= 0 && y <= (x + r)) ||
                    (x <= 0 && y <= 0 && x >= -r && y >= -r)) {
                result = "Точка попала в область";
                rowForSession.setBoolResult(true);
                jsonForAjax.put("boolResult", true);
            } else {
                result = "Точка не попала в область";
                rowForSession.setBoolResult(false);
                jsonForAjax.put("boolResult", false);
            }

            rowForSession.setResult(result);
            jsonForAjax.put("result", result);

            double workTime = ((double) (System.nanoTime() - start)) / Math.pow(10, 9);
            rowForSession.setWorkTime(String.format("%.2g", workTime));
            jsonForAjax.put("workTime", String.format("%.2g", workTime));

            ((ArrayList) session.getAttribute("table")).add(rowForSession);

            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.getWriter().println(jsonForAjax);

            ((HashSet)getServletContext().getAttribute("accessSet"))
                    .remove(req.getSession().getId());
        }
        else{
            resp.sendError(403, "Use /lab2 URL to access page");
        }
    }
}
