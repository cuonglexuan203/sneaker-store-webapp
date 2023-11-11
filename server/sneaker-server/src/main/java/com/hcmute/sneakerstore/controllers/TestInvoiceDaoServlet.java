package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.business.enums.DeliveryStatus;
import com.hcmute.sneakerstore.data.InvoiceDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@WebServlet("/testInvoiceDao")
public class TestInvoiceDaoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        StringBuilder output = new StringBuilder();

        try {
            // Test insertOne
            Invoice newInvoice = Invoice.builder()
                    .paymentTime(LocalDateTime.now())
                    .totalAmount(111)
                    .build(); // Properly populate the new Invoice object
            long newInvoiceId = InvoiceDao.insertOne(newInvoice);
            output.append("insertOne: Inserted Invoice with ID: ").append(newInvoiceId).append("\n");

            // Test insertMany
            Invoice newInvoice2 = Invoice.builder().paymentTime(LocalDateTime.now()).totalAmount(222).build();
            Invoice newInvoice3 = Invoice.builder().paymentTime(LocalDateTime.now()).totalAmount(333).build();
            Invoice newInvoice4 = Invoice.builder().paymentTime(LocalDateTime.now()).totalAmount(333).build();
            Invoice newInvoice5 = Invoice.builder().paymentTime(LocalDateTime.now()).totalAmount(444).build();
            long insertManyCount = InvoiceDao
                    .insertMany(Arrays.asList(newInvoice2, newInvoice3, newInvoice4, newInvoice5));
            output.append("insertMany: Inserted count: ").append(insertManyCount).append("\n");

            // Test selectOne
            Invoice Invoice = InvoiceDao.selectOne(newInvoiceId); // Use the ID from the insert test
            output.append("selectOne: ").append(Invoice != null ? Invoice.toString() : "No Invoice found").append("\n");

            // Test selectMany
            List<Invoice> Invoices = InvoiceDao.selectMany();
            output.append("selectMany: ").append(Invoices != null ? Invoices.toString() : "No Invoices found")
                    .append("\n");

            // Test selectMany with IDs
            List<Long> ids = List.of(2l, 4l, 5l); // Use IDs from the previous inserts
            List<Invoice> InvoicesByIds = InvoiceDao.selectMany(ids);
            output.append("selectManyByIds: ")
                    .append(InvoicesByIds != null ? InvoicesByIds.toString() : "No invoices found").append("\n");

            // Test updateOne
            if (Invoice != null) {
                Invoice.setDeliveryStatus(DeliveryStatus.CANCELLED); // Example update action
                Invoice updatedInvoice = InvoiceDao.updateOne(Invoice);
                output.append("updateOne: ").append(updatedInvoice).append("\n");
            }
            Invoices = InvoiceDao.selectMany();
            output.append("selectMany after updateOne: ")
                    .append(Invoices != null ? Invoices.toString() : "No Invoice found").append("\n");
            //
            // Test updateMany
            newInvoice5.setDeliveryStatus(DeliveryStatus.IN_TRANSIT);
            newInvoice3.setPaymentTime(LocalDateTime.MAX);
            List<Invoice> updatedInvoices = List.of(newInvoice5, newInvoice3);
            long updatedCount = InvoiceDao.updateMany(updatedInvoices);
            output.append("updateMany: ").append(updatedCount).append("\n");

            Invoices = InvoiceDao.selectMany();
            output.append("selectMany after updateMany: ")
                    .append(Invoices != null ? Invoices.toString() : "No Invoice found").append("\n");

            //
            // // Test deleteOne
            long ok = InvoiceDao.deleteOne(newInvoiceId); // Use the ID from the insert test
            output.append("deleteOne: ").append(ok == 1 ? "Success" : "Failed").append("\n");
            //
            // // Test deleteManyByIds
            if (!ids.isEmpty()) {
                long deleteManyByIdsCount = InvoiceDao.deleteMany(ids);
                output.append("deleteManyByIds: Deleted ").append(deleteManyByIdsCount).append(" invoices")
                        .append("\n");
            }
            //
            // // Test deleteMany
            long deleteManyCount = InvoiceDao.deleteMany();
            output.append("deleteMany: Deleted ").append(deleteManyCount).append(" invoices").append("\n");

        } catch (Exception e) {
            output.append("An error occurred: ").append(e.getMessage());
        }

        response.getWriter().print(output.toString());
    }
}