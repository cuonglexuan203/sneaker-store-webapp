package com.hcmute.sneakerstore.data;

import java.util.List;

import com.hcmute.sneakerstore.business.Sale;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class SaleDao {

    public static Sale selectOne(long id) {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        return em.find(Sale.class, id);
    }

    public static List<Sale> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<Sale> query = em.createQuery("SELECT s FROM Sale s", Sale.class);
        return DBUtils.getResultList(query);
    }

    public static List<Sale> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids))
            return null;
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = "SELECT s FROM Sale s WHERE s.id IN :ids";
        TypedQuery<Sale> query = em.createQuery(str, Sale.class);
        query.setParameter("ids", ids);

        return DBUtils.getResultList(query);
    }

    public static long insertOne(Sale entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<Sale> entities) {
        return DBUtils.insertMany(entities);
    }

    public static Sale updateOne(Sale entity) {
        return DBUtils.updateOne(entity);
    }

    public static List<Sale> updateMany(List<Sale> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(Long id) {
        Sale deletedSale = selectOne(id);
        return DBUtils.deleteOne(deletedSale);
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        EntityTransaction tran = em.getTransaction();
        Query query = em.createQuery("DELETE FROM Sale");
        return DBUtils.executeUpdateOrDelete(query, tran);
    }

    public static long deleteMany(List<Long> ids) {
        List<Sale> deletedSales = selectMany(ids);
        return DBUtils.deleteMany(deletedSales);
    }

}
