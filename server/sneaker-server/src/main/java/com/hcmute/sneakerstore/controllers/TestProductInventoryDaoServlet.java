// package com.hcmute.sneakerstore.controllers;

// public class TestProductInventoryDao {

// }

package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.enums.Color;

import com.hcmute.sneakerstore.data.ProductInventoryDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.hibernate.engine.jdbc.Size;

@WebServlet("/testProductInventoryDao")
public class TestProductInventoryDaoServlet extends HttpServlet {

        protected void doGet(HttpServletRequest request, HttpServletResponse response)
                        throws ServletException, IOException {
                response.setContentType("text/plain");
                StringBuilder output = new StringBuilder();

                try {
                        // Test insertOne
                        ProductInventory newProductInventory = ProductInventory.builder().build(); // Properly populate
                                                                                                   // the new
                                                                                                   // ProductInventory
                                                                                                   // object
                        long newProductInventoryId = ProductInventoryDao.insertOne(newProductInventory);
                        output.append("insertOne: Inserted ProductInventory with ID: ").append(newProductInventoryId)
                                        .append("\n");

                        // Test insertMany
                        ProductInventory newProductInventory2 = ProductInventory.builder().build();

                        ProductInventory newProductInventory3 = ProductInventory.builder().build();

                        ProductInventory newProductInventory4 = ProductInventory.builder().build();

                        ProductInventory newProductInventory5 = ProductInventory.builder().build();

                        long insertManyCount = ProductInventoryDao
                                        .insertMany(Arrays.asList(newProductInventory2, newProductInventory3,
                                                        newProductInventory4, newProductInventory5));
                        output.append("insertMany: Inserted count: ").append(insertManyCount).append("\n");

                        // Test selectOne
                        ProductInventory ProductInventory = ProductInventoryDao.selectOne(newProductInventoryId); // Use
                                                                                                                  // the
                                                                                                                  // ID
                                                                                                                  // from
                                                                                                                  // the
                                                                                                                  // insert
                                                                                                                  // test
                        output.append("selectOne: ")
                                        .append(ProductInventory != null ? ProductInventory.toString()
                                                        : "No ProductInventory found")
                                        .append("\n");

                        // Test selectMany
                        List<ProductInventory> ProductInventories = ProductInventoryDao.selectMany();
                        output.append("selectMany: ")
                                        .append(ProductInventories != null ? ProductInventories.toString()
                                                        : "No ProductInventories found")
                                        .append("\n");

                        // Test selectMany with IDs
                        List<Long> ids = List.of(2l, 4l, 5l); // Use IDs from the previous inserts
                        List<ProductInventory> ProductInventoriesByIds = ProductInventoryDao.selectMany(ids);
                        output.append("selectManyByIds: ")
                                        .append(ProductInventoriesByIds != null ? ProductInventoriesByIds.toString()
                                                        : "No ProductInventories found")
                                        .append("\n");

                        // Test updateOne
                        if (ProductInventory != null) {
                                ProductInventory.setColor(Color.RED); // Example update action
                                ProductInventory updatedProductInventory = ProductInventoryDao
                                                .updateOne(ProductInventory);
                                output.append("updateOne: ").append(updatedProductInventory).append("\n");
                        }
                        ProductInventories = ProductInventoryDao.selectMany();
                        output.append("selectMany after updateOne: ")
                                        .append(ProductInventories != null ? ProductInventories.toString()
                                                        : "No ProductInventory found")
                                        .append("\n");
                        //
                        // Test updateMany
                        newProductInventory5.setSize(Size.DEFAULT_SCALE);
                        ;
                        newProductInventory3.setProductAmount(20);
                        ;
                        List<ProductInventory> updatedProductInventories = List.of(newProductInventory5,
                                        newProductInventory3);
                        long updatedCount = ProductInventoryDao.updateMany(updatedProductInventories);
                        output.append("updateMany: ").append(updatedCount).append("\n");

                        ProductInventories = ProductInventoryDao.selectMany();
                        output.append("selectMany after updateMany: ")
                                        .append(ProductInventories != null ? ProductInventories.toString()
                                                        : "No ProductInventory found")
                                        .append("\n");

                        //
                        // // Test deleteOne
                        long ok = ProductInventoryDao.deleteOne(newProductInventoryId); // Use the ID from the insert
                                                                                        // test
                        output.append("deleteOne: ").append(ok == 1 ? "Success" : "Failed").append("\n");
                        //
                        // // Test deleteManyByIds
                        if (!ids.isEmpty()) {
                                long deleteManyByIdsCount = ProductInventoryDao.deleteMany(ids);
                                output.append("deleteManyByIds: Deleted ").append(deleteManyByIdsCount)
                                                .append(" ProductInventories")
                                                .append("\n");
                        }
                        //
                        // // Test deleteMany
                        long deleteManyCount = ProductInventoryDao.deleteMany();
                        output.append("deleteMany: Deleted ").append(deleteManyCount).append(" ProductInventories")
                                        .append("\n");

                } catch (Exception e) {
                        output.append("An error occurred: ").append(e.getMessage());
                }

                response.getWriter().print(output.toString());
        }
}