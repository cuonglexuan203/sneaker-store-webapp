package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class CartDao implements GenericDao<Cart> {

	@Override
	public Cart findById(long id) {
		return DBUtils.selectOne(Cart.class, id);
	}

	@Override
	public List<Cart> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Cart> query = em.createQuery("select c from Cart c",
				Cart.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<Cart> findMany(List<Long> ids) {
		if (ValidationUtils.isNullOrEmpty(ids))
			return null;

		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select c from Cart c where c.id in :ids")
				.toString();
		TypedQuery<Cart> query = em.createQuery(str, Cart.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	@Override
	public long add(Cart entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<Cart> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public Cart update(Cart entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<Cart> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(Cart.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Cart");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Cart.class, ids);
	}

}
