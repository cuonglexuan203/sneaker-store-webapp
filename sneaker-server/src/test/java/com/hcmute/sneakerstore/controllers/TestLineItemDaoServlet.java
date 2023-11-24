package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.data.DAOs.LineItemDao;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebServlet("/testLineItemDao")
public class TestLineItemDaoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        StringBuilder output = new StringBuilder();

        try {
            // Test insertOne
            LineItem newLineItem = LineItem.builder().build(); // Properly populate the new LineItem object
            long newLineItemId = LineItemDao.insertOne(newLineItem);
            output.append("insertOne: Inserted line item with ID: ").append(newLineItemId).append("\n");
            
            // Test insertMany
            LineItem newLineItem2 = LineItem.builder().build(); // Properly populate the new LineItem object
            LineItem newLineItem3 = LineItem.builder().build(); // Properly populate the new LineItem object
            LineItem newLineItem4 = LineItem.builder().build();
            LineItem newLineItem5 = LineItem.builder().build();
            long insertManyCount = LineItemDao.insertMany(Arrays.asList(newLineItem2, newLineItem3, newLineItem4, newLineItem5));
            output.append("insertMany: Inserted count: ").append(insertManyCount).append("\n");

            // Test selectOne
            LineItem lineItem = LineItemDao.selectOne(newLineItemId); // Use the ID from the insert test
            output.append("selectOne: ").append(lineItem != null ? lineItem.toString() : "No line item found").append("\n");

            // Test selectMany
            List<LineItem> lineItems = LineItemDao.selectMany();
            output.append("selectMany: ").append(lineItems != null ? lineItems.toString() : "No line items found").append("\n");

            // Test selectMany with IDs
            List<Long> ids = List.of(1L, 3L, 5L);
            List<LineItem> lineItemsByIds = LineItemDao.selectMany(ids);
            output.append("selectManyByIds: ").append(lineItemsByIds != null ? lineItemsByIds.toString() : "No line items found").append("\n");

            // Test deleteOne
            long deleteOneResult = LineItemDao.deleteOne(newLineItemId); // Use the ID from the insert test
            output.append("deleteOne: ").append(deleteOneResult == 1 ? "Success" : "Failed").append("\n");

            // Test deleteManyByIds
            if (!ids.isEmpty()) {
                long deleteManyByIdsCount = LineItemDao.deleteMany(ids);
                output.append("deleteManyByIds: Deleted ").append(deleteManyByIdsCount).append(" line items").append("\n");
            }

            // Test deleteMany
            long deleteManyCount = LineItemDao.deleteMany();
            output.append("deleteMany: Deleted ").append(deleteManyCount).append(" line items").append("\n");
            
        } catch (Exception e) {
            output.append("An error occurred: ").append(e.getMessage());
        }

        response.getWriter().print(output.toString());
    }
}
