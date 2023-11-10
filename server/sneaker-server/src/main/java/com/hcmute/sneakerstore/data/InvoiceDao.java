package com.hcmute.sneakerstore.data;

import java.util.List;
import java.util.Optional;

import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;

public class InvoiceDao {
    // Tạo 1 getEntityManager method để get an EntityManager instance.
    private EntityManager getEntityManager() {
        return JpaProvider.getEntityManager();
    }

    // Ở dưới tương tự - dùng try-finally block thay vì @Cleanup để đọc cho nó dễ
    // hiểu tí, tuy hơi dài dòng
    public Optional<Invoice> selectOne(long id) {
        EntityManager em = getEntityManager();
        try {
            return Optional.ofNullable(em.find(Invoice.class, id));
        } finally {
            em.close();
        }
    }

    public List<Invoice> selectMany() {
        EntityManager em = getEntityManager();
        try {
            TypedQuery<Invoice> query = em.createQuery("SELECT a FROM Invoice a", Invoice.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public List<Invoice> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids)) {
            return List.of(); // Prefer returning an empty list over null.
        }
        EntityManager em = getEntityManager();
        try {
            TypedQuery<Invoice> query = em.createQuery("SELECT a FROM Invoice a WHERE a.id IN :ids", Invoice.class);
            query.setParameter("ids", ids);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public long insertOne(Invoice entity) {
        return DBUtils.insertOne(entity);
    }

    // public long insertMany(List<Invoice> entities) {
    // return DBUtils.insertMany(entities);
    // }

    public Invoice updateOne(Invoice entity) {
        return DBUtils.updateOne(entity);
    }

    public List<Invoice> updateMany(List<Invoice> entities) {
        return DBUtils.updateMany(entities);
    }

    public long deleteMany() {
        EntityManager em = getEntityManager();
        EntityTransaction tran = em.getTransaction();
        try {
            tran.begin();
            int deletedCount = em.createQuery("DELETE FROM Invoice").executeUpdate();
            tran.commit();
            return deletedCount;
        } finally {
            if (tran.isActive()) {
                tran.rollback();
            }
            em.close();
        }
    }

    public long deleteOne(Long id) {
        Optional<Invoice> deletedInvoice = selectOne(id);
        return DBUtils.deleteOne(deletedInvoice);
    }

    public long insertMany(List<Long> ids) {
        List<Invoice> insertedInvoices = selectMany(ids);
        return DBUtils.insertMany(insertedInvoices);
    }

    public long deleteMany(List<Long> ids) {
        List<Invoice> deleteInvoices = selectMany(ids);
        return DBUtils.deleteMany(deleteInvoices);
    }
}
