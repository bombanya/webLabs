package com.bombanya.web2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;

@WebServlet(name = "controller", value = "/lab2")
public class ControllerServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        getServletContext().setAttribute("accessSet", new HashSet<String>());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ((HashSet)getServletContext().getAttribute("accessSet"))
                .add(req.getSession().getId());

        if (req.getParameter("r") == null
                || req.getParameter("x") == null
                || req.getParameter("y") == null){
            req.getRequestDispatcher("page.jsp").forward(req, resp);
        }
        else{
            req.getRequestDispatcher("model").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
