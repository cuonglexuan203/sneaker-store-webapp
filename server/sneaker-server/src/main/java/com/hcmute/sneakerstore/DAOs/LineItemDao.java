package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class LineItemDao implements GenericDao<LineItem> {

	@Override
	public LineItem findById(long id) {
		return DBUtils.selectOne(LineItem.class, id);
	}

	@Override
	public List<LineItem> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<LineItem> query = em.createQuery("select l from LineItem l",
				LineItem.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<LineItem> findMany(List<Long> ids) {
		if (ValidationUtils.isNullOrEmpty(ids))
			return null;

		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select l from LineItem l where l.id in :ids")
				.toString();
		TypedQuery<LineItem> query = em.createQuery(str, LineItem.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	@Override
	public long add(LineItem entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<LineItem> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public LineItem update(LineItem entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<LineItem> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(LineItem.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from LineItem");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(LineItem.class, ids);
	}

}
