package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class AccountDao implements GenericDao<Account> {

	@Override
	public Account findById(long id) {
		return DBUtils.selectOne(Account.class, id);
	}

	public Account findByUsername(String username) {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Account> query = em.createQuery(
				"select a from Account a where username = :username",
				Account.class);
		query.setParameter("username", username);
		return DBUtils.getSingleResult(query);
	}

	@Override
	public List<Account> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Account> query = em.createQuery("select a from Account a",
				Account.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<Account> findMany(List<Long> ids) {

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

	@Override
	public long add(Account entity) {

		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<Account> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public Account update(Account entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<Account> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(Account.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Account");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Account.class, ids);
	}

}
