package com.hcmute.sneakerstore.data;

import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.business.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

import java.util.List;

public class UserDao {

    public static User selectOne(Long id) {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        return em.find(User.class, id);
    }

    public static List<User> selectMany(List<Long> ids) {
        @Cleanup
        EntityManager em = JpaProvider.getEntityManager();
        TypedQuery<User> query = em.createQuery("SELECT u FROM User u", User.class);
        return DBUtils.getResultList(query);
    }

    public static long insertOne(User entity) {
        return DBUtils.insertOne(entity);
    }

    public static long insertMany(List<User> entities) {
        return DBUtils.insertMany(entities);
    }

    public static User updateOne(User entity) {
        return DBUtils.updateOne(entity);
    }

    public static long updateMany(List<User> entities) {
        return DBUtils.updateMany(entities);
    }

    public static long deleteOne(long id) {
		return DBUtils.deleteOne(User.class, id);
	}

    public static long deleteMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from User");
		return DBUtils.executeUpdateOrDelete(em, query);
	}
    
    public static long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(User.class, ids);
	}
    
}