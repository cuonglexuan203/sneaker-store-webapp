package com.hcmute.sneakerstore.data;

import java.util.List;

import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class AccountDao {

	public static Account selectOne(long id) {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		return em.find(Account.class, id);
	}

	public static List<Account> selectMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Account> query = em.createQuery("select a from Account a", Account.class);
		return DBUtils.getResultList(query);
	}

	public static List<Account> selectMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder().append("select a from Account a where a.id in :ids").toString();
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

	public static List<Account> updateMany(List<Account> entities) {
		return DBUtils.updateMany(entities);
	}

	public static long deleteOne(Long id) {
		Account deletedAccount = selectOne(id);
		return DBUtils.deleteOne(deletedAccount);
	}

	public static long deleteMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		Query query = em.createQuery("delete from Account");
		return DBUtils.executeUpdateOrDelete(query, tran);
	}

	public static long deleteMany(List<Long> ids) {
		List<Account> deletedAccounts = selectMany(ids);
		return DBUtils.deleteMany(deletedAccounts);
	}

}
