package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Sale;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class SaleDao implements GenericDao<Sale> {

	@Override
	public Sale findById(long id) {
		return DBUtils.selectOne(Sale.class, id);
	}

	@Override
	public List<Sale> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Sale> query = em.createQuery("select s from Sale s",
				Sale.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<Sale> findMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select s from Sale s where s.id in :ids")
				.toString();
		TypedQuery<Sale> query = em.createQuery(str, Sale.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	@Override
	public long add(Sale entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<Sale> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public Sale update(Sale entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<Sale> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(Sale.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Sale");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Sale.class, ids);
	}
}
