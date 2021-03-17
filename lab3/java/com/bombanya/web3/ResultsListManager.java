package com.bombanya.web3;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
import java.util.ArrayList;

public class ResultsListManager {

    @PersistenceContext
    EntityManager em;

    @Resource
    private UserTransaction transaction;

    private final ArrayList<TableRow> resultsList = new ArrayList<>();

    public ArrayList<TableRow> getResultsList() {
        return resultsList;
    }

    public void addNewRow(TableRow row){
        try {
            transaction.begin();
            em.persist(row);
            transaction.commit();
        } catch (Exception e) {
            System.out.println("dead inside");
        }
        resultsList.add(row);
    }
}
