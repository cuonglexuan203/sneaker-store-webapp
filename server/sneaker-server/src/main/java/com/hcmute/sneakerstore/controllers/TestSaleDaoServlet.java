package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.Sale;
import com.hcmute.sneakerstore.business.enums.SaleType;
import com.hcmute.sneakerstore.data.SaleDao;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebServlet("/testSaleDao")
public class TestSaleDaoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        StringBuilder output = new StringBuilder();

        try {
            // Test insertOne
            Sale newSale = Sale.builder()
                    .type(SaleType.FLASH_SALE)
                    .percentage(10.f)
                    .build();
            long newSaleId = SaleDao.insertOne(newSale);
            output.append("insertOne: Inserted sale with ID: ").append(newSaleId).append("\n");

            // Test insertMany
            Sale newSale2 = Sale.builder().type(SaleType.FLASH_SALE).percentage(20.f).build();
            Sale newSale3 = Sale.builder().type(SaleType.FLASH_SALE).percentage(30.f).build();
            long insertManyCount = SaleDao.insertMany(Arrays.asList(newSale2, newSale3));
            output.append("insertMany: Inserted count: ").append(insertManyCount).append("\n");

            // Test selectOne
            Sale sale = SaleDao.selectOne(newSaleId);
            output.append("selectOne: ").append(sale != null ? sale.toString() : "No sale found").append("\n");

            // Test selectMany
            List<Sale> sales = SaleDao.selectMany();
            output.append("selectMany: ").append(sales != null ? sales.toString() : "No sales found").append("\n");

            // Test updateOne
            if (sale != null) {
                sale.setPercentage(15.f); // Example update action
                Sale updatedSale = SaleDao.updateOne(sale);
                output.append("updateOne: ").append(updatedSale).append("\n");
            }

            // Test deleteOne
            long ok = SaleDao.deleteOne(newSaleId);
            output.append("deleteOne: ").append(ok == 1 ? "Success" : "Failed").append("\n");

            // Test deleteMany
            long deleteManyCount = SaleDao.deleteMany();
            output.append("deleteMany: Deleted ").append(deleteManyCount).append(" sales").append("\n");

        } catch (Exception e) {
            output.append("An error occurred: ").append(e.getMessage());
        }

        response.getWriter().print(output.toString());
    }
}
