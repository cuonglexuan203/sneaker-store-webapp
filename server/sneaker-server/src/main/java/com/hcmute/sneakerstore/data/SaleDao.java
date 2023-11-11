package com.hcmute.sneakerstore.data;

import java.util.List;

import com.hcmute.sneakerstore.business.Sale; 
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class SaleDao { 

    public static Sale selectOne(long id) {
        return DBUtils.selectOne(Sale.class, id); 
    }

    public static List<Sale> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<Sale> query = em.createQuery("select s from Sale s", Sale.class); 
        return DBUtils.getResultList(query);
    }

    public static List<Sale> selectMany(List<Long> ids) {

        if (ValidationUtils.isNullOrEmpty(ids))
            return null;
        //
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = new StringBuilder().append("select s from Sale s where s.id in :ids").toString();
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

    public static long updateMany(List<Sale> entities) { 
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(long id) {
        return DBUtils.deleteOne(Sale.class, id); 
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        Query query = em.createQuery("delete from Sale"); 
        return DBUtils.executeUpdateOrDelete(em, query);
    }

    public static long deleteMany(List<Long> ids) {
        return DBUtils.deleteMany(Sale.class, ids); 
    }

}
