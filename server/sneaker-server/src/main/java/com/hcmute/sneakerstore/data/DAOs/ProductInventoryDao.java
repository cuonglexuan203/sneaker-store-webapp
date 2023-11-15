package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class ProductInventoryDao {
    //
    public static ProductInventory selectOne(long id) {
        return DBUtils.selectOne(ProductInventory.class, id);
    }

    public static List<ProductInventory> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<ProductInventory> query = em.createQuery("select c from ProductInventory c", ProductInventory.class);
        return DBUtils.getResultList(query);
    }

    public static List<ProductInventory> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids))
            return null;

        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = new StringBuilder().append("select c from ProductInventory c where c.id in :ids").toString();
        TypedQuery<ProductInventory> query = em.createQuery(str, ProductInventory.class);
        query.setParameter("ids", ids);

        return DBUtils.getResultList(query);
    }

    public static long insertOne(ProductInventory entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<ProductInventory> entities) {
        return DBUtils.insertMany(entities);
    }

    public static ProductInventory updateOne(ProductInventory entity) {
        return DBUtils.updateOne(entity);
    }

    public static long updateMany(List<ProductInventory> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(long id) {
        return DBUtils.deleteOne(ProductInventory.class, id);
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        Query query = em.createQuery("delete from ProductInventory");
        return DBUtils.executeUpdateOrDelete(em, query);
    }

    public static long deleteMany(List<Long> ids) {
        return DBUtils.deleteMany(ProductInventory.class, ids);
    }
}