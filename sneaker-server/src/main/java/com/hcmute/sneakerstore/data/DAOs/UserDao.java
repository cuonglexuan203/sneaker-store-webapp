package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class UserDao {

	public static User selectOne(long id) {
		return DBUtils.selectOne(User.class, id);
	}

	public static List<User> selectMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<User> query = em.createQuery("select u from User u",
				User.class);
		return DBUtils.getResultList(query);
	}

	public static List<User> selectMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select u from User u where u.id in :ids")
				.toString();
		TypedQuery<User> query = em.createQuery(str, User.class);
		query.setParameter("ids", ids);

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
