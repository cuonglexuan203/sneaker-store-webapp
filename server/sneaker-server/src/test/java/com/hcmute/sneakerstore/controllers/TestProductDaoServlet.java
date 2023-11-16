package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@WebServlet("/testProductDao")
public class TestProductDaoServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        StringBuilder output = new StringBuilder();

        try {
            // Test insertOne
            Product newProduct = Product.builder()
                    .brand("Nike")
                    .name("Air Max")
                    .ean("123456789")
                    .price(100.0f)
                    .releaseDate(LocalDate.now())                    .imageUrl("http://example.com/image.jpg")
                    .build();
            long newProductId = ProductDao.insertOne(newProduct);
            output.append("insertOne: Inserted product with ID: ").append(newProductId).append("\n");

            // Test insertMany
            Product newProduct2 = Product.builder().brand("Adidas").name("Yeezy").ean("987654321").price(200.0f).imageUrl("http://example.com/image.jpg").build();
            Product newProduct3 = Product.builder().brand("Puma").name("Suede").ean("192837465").price(150.0f).imageUrl("http://example.com/image.jpg").build();
            long insertManyCount = ProductDao.insertMany(Arrays.asList(newProduct2, newProduct3));
            output.append("insertMany: Inserted count: ").append(insertManyCount).append("\n");

            // Test selectOne
            Product product = ProductDao.selectOne(newProductId);
            output.append("selectOne: ").append(product != null ? product.toString() : "No product found").append("\n");

            // Test selectMany
            List<Product> products = ProductDao.selectMany();
            output.append("selectMany: ").append(products != null ? products.toString() : "No products found").append("\n");

            // Test selectMany with IDs
            List<Long> ids = List.of(newProductId, newProduct2.getId(), newProduct3.getId());
            List<Product> productsByIds = ProductDao.selectMany(ids);
            output.append("selectManyByIds: ").append(productsByIds != null ? productsByIds.toString() : "No products found").append("\n");

            // Test updateOne
            if (product != null) {
                product.setPrice(110.0f); // Example update action
                Product updatedProduct = ProductDao.updateOne(product);
                output.append("updateOne: ").append(updatedProduct).append("\n");
            }
            products = ProductDao.selectMany();
            output.append("selectMany after updateOne: ").append(products != null ? products.toString() : "No products found").append("\n");

            // Test updateMany
            newProduct3.setPrice(160.0f);
            List<Product> updatedProducts = List.of(newProduct3);
            long updatedCount = ProductDao.updateMany(updatedProducts);
            output.append("updateMany: ").append(updatedCount).append("\n");
            
            products = ProductDao.selectMany();
            output.append("selectMany after updateMany: ").append(products != null ? products.toString() : "No products found").append("\n");

            // Test deleteOne
            long ok = ProductDao.deleteOne(newProductId);
            output.append("deleteOne: ").append(ok == 1 ? "Success" : "Failed").append("\n");

            // Test deleteManyByIds
            if (!ids.isEmpty()) {
                long deleteManyByIdsCount = ProductDao.deleteMany(ids);
                output.append("deleteManyByIds: Deleted ").append(deleteManyByIdsCount).append(" products").append("\n");
            }

            // Test deleteMany
            long deleteManyCount = ProductDao.deleteMany();
            output.append("deleteMany: Deleted ").append(deleteManyCount).append(" products").append("\n");
            
        } catch (Exception e) {
            output.append("An error occurred: ").append(e.getMessage());
        }

        response.getWriter().print(output.toString());
    }
}
