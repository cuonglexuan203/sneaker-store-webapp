package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class AccountDao {

	public static Account selectOne(long id) {
		return DBUtils.selectOne(Account.class, id);
	}

	public static Account selectOne(String username) {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Account> query = em.createQuery(
				"select a from Account a where username = :username",
				Account.class);
		query.setParameter("username", username);
		return DBUtils.getSingleResult(query);
	}

	public static List<Account> selectMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Account> query = em.createQuery("select a from Account a",
				Account.class);
		return DBUtils.getResultList(query);
	}

	public static List<Account> selectMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select a from Account a where a.id in :ids")
				.toString();
		TypedQuery<Account> query = em.createQuery(str, Account.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	public static long insertOne(Account entity) {

		return DBUtils.insertOne(entity);
	}

	public static long insertMany(List<Account> entities) {
		return DBUtils.insertMany(entities);
	}

	public static Account updateOne(Account entity) {
		return DBUtils.updateOne(entity);
	}

	public static long updateMany(List<Account> entities) {
		return DBUtils.updateMany(entities);
	}

	public static long deleteOne(long id) {
		return DBUtils.deleteOne(Account.class, id);
	}

	public static long deleteMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Account");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	public static long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Account.class, ids);
	}

}
