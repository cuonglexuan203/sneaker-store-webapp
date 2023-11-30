package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class UserDao implements GenericDao<User> {

	@Override
	public User findById(long id) {
		return DBUtils.selectOne(User.class, id);
	}

	@Override
	public List<User> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<User> query = em.createQuery("select u from User u",
				User.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<User> findMany(List<Long> ids) {

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

	@Override
	public long add(User entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<User> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public User update(User entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<User> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(User.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from User");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(User.class, ids);
	}
}
