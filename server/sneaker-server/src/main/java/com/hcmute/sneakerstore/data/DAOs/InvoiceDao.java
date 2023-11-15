package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;
import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class InvoiceDao {
    //
    public static Invoice selectOne(long id) {
        return DBUtils.selectOne(Invoice.class, id);
    }

    public static List<Invoice> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<Invoice> query = em.createQuery("select c from Invoice c", Invoice.class);
        return DBUtils.getResultList(query);
    }

    public static List<Invoice> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids))
            return null;

        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = new StringBuilder().append("select c from Invoice c where c.id in :ids").toString();
        TypedQuery<Invoice> query = em.createQuery(str, Invoice.class);
        query.setParameter("ids", ids);

        return DBUtils.getResultList(query);
    }

    public static long insertOne(Invoice entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<Invoice> entities) {
        return DBUtils.insertMany(entities);
    }

    public static Invoice updateOne(Invoice entity) {
        return DBUtils.updateOne(entity);
    }

    public static long updateMany(List<Invoice> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(long id) {
        return DBUtils.deleteOne(Invoice.class, id);
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        Query query = em.createQuery("delete from Invoice");
        return DBUtils.executeUpdateOrDelete(em, query);
    }

    public static long deleteMany(List<Long> ids) {
        return DBUtils.deleteMany(Invoice.class, ids);
    }

}