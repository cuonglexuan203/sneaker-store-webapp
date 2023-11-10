package com.hcmute.sneakerstore.data;

import java.util.List;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class ProductDao {

    public static Product selectOne(int id) {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        return em.find(Product.class, id);
    }

    public static List<Product> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<Product> query = em.createQuery("SELECT p FROM Product p", Product.class);
        return DBUtils.getResultList(query);
    }

    public static List<Product> selectMany(List<Integer> ids) {
        if (ValidationUtils.isNullOrEmpty(ids))
            return null;
        //
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = "SELECT p FROM Product p WHERE p.id IN :ids";
        TypedQuery<Product> query = em.createQuery(str, Product.class);
        query.setParameter("ids", ids);

        return DBUtils.getResultList(query);
    }

    public static long insertOne(Product entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<Product> entities) {
        return DBUtils.insertMany(entities);
    }

    public static Product updateOne(Product entity) {
        return DBUtils.updateOne(entity);
    }

    public static List<Product> updateMany(List<Product> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(Integer id) {
        Product deletedProduct = selectOne(id);
        return DBUtils.deleteOne(deletedProduct);
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        EntityTransaction tran = em.getTransaction();
        Query query = em.createQuery("DELETE FROM Product");
        return DBUtils.executeUpdateOrDelete(query, tran);
    }

    public static long deleteMany(List<Integer> ids) {
        List<Product> deletedProducts = selectMany(ids);
        return DBUtils.deleteMany(deletedProducts);
    }

}
