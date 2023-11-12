package com.hcmute.sneakerstore.data;

import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

import java.util.List;

public class LineItemDao {

    public static LineItem selectOne(Long id) {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        return em.find(LineItem.class, id);
    }

    public static List<LineItem> selectMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<LineItem> query = em.createQuery("SELECT l FROM LineItem l", LineItem.class);
        return DBUtils.getResultList(query);
    }

    public static List<LineItem> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids))
            return null;

        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        String str = "select l from LineItem l where l.id in :ids";
        TypedQuery<LineItem> query = em.createQuery(str, LineItem.class);
        query.setParameter("ids", ids);

        return DBUtils.getResultList(query);
    }

    public static long insertOne(LineItem entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<LineItem> entities) {
        return DBUtils.insertMany(entities);
    }

    public static LineItem updateOne(LineItem entity) {
        return DBUtils.updateOne(entity);
    }

    public static long updateMany(List<LineItem> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(long id) {
        return DBUtils.deleteOne(LineItem.class, id);
    }

    public static long deleteMany() {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        Query query = em.createQuery("delete from LineItem");
        return DBUtils.executeUpdateOrDelete(em, query);
    }

    public static long deleteMany(List<Long> ids) {
        return DBUtils.deleteMany(LineItem.class, ids);
    }
}
