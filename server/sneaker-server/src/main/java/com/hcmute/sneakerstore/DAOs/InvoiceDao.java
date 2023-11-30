package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Invoice;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class InvoiceDao implements GenericDao<Invoice> {

	@Override
	public Invoice findById(long id) {
		return DBUtils.selectOne(Invoice.class, id);
	}

	@Override
	public List<Invoice> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Invoice> query = em.createQuery("select i from Invoice i",
				Invoice.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<Invoice> findMany(List<Long> ids) {
		if (ValidationUtils.isNullOrEmpty(ids))
			return null;

		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = "select i from Invoice i where i.id in :ids";
		TypedQuery<Invoice> query = em.createQuery(str, Invoice.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	@Override
	public long add(Invoice entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<Invoice> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public Invoice update(Invoice entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<Invoice> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(Invoice.class, id);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Invoice.class, ids);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Invoice");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

}
