package com.hcmute.sneakerstore.data;

import java.util.List;
import java.util.Optional;

import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.TypedQuery;

public class ProductInventoryDao {
    // Tạo 1 getEntityManager method để get an EntityManager instance.
    private EntityManager getEntityManager() {
        return JpaProvider.getEntityManager();
    }

    // Ở dưới tương tự - dùng try-finally block thay vì @Cleanup để đọc cho nó dễ
    // hiểu tí, tuy hơi dài dòng
    public Optional<ProductInventory> selectOne(long id) {
        EntityManager em = getEntityManager();
        try {
            return Optional.ofNullable(em.find(ProductInventory.class, id));
        } finally {
            em.close();
        }
    }

    public List<ProductInventory> selectMany() {
        EntityManager em = getEntityManager();
        try {
            TypedQuery<ProductInventory> query = em.createQuery("SELECT a FROM ProductInventory a",
                    ProductInventory.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public List<ProductInventory> selectMany(List<Long> ids) {
        if (ValidationUtils.isNullOrEmpty(ids)) {
            return List.of(); // Prefer returning an empty list over null.
        }
        EntityManager em = getEntityManager();
        try {
            TypedQuery<ProductInventory> query = em.createQuery("SELECT a FROM ProductInventory a WHERE a.id IN :ids",
                    ProductInventory.class);
            query.setParameter("ids", ids);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public long insertOne(ProductInventory entity) {
        return DBUtils.insertOne(entity);
    }

    // public long insertMany(List<ProductInventory> entities) {
    // return DBUtils.insertMany(entities);
    // }

    public ProductInventory updateOne(ProductInventory entity) {
        return DBUtils.updateOne(entity);
    }

    public List<ProductInventory> updateMany(List<ProductInventory> entities) {
        return DBUtils.updateMany(entities);
    }

    public long deleteMany() {
        EntityManager em = getEntityManager();
        EntityTransaction tran = em.getTransaction();
        try {
            tran.begin();
            int deletedCount = em.createQuery("DELETE FROM ProductInventory").executeUpdate();
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
        Optional<ProductInventory> deletedProductInventory = selectOne(id);
        return DBUtils.deleteOne(deletedProductInventory);
    }

    public long insertMany(List<Long> ids) {
        List<ProductInventory> insertedProductInventories = selectMany(ids);
        return DBUtils.insertMany(insertedProductInventories);
    }

    public long deleteMany(List<Long> ids) {
        List<ProductInventory> deleteProductInventories = selectMany(ids);
        return DBUtils.deleteMany(deleteProductInventories);
    }
}
