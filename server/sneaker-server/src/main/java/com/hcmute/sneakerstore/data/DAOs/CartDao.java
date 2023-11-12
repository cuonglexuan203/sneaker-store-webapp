package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class CartDao {

	public static Cart selectOne(long id) {
		return DBUtils.selectOne(Cart.class, id);
	}

	public static List<Cart> selectMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Cart> query = em.createQuery("select c from Cart c",
				Cart.class);
		return DBUtils.getResultList(query);
	}

	public static List<Cart> selectMany(List<Long> ids) {
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

	public static long insertOne(Cart entity) {
		return DBUtils.insertOne(entity);
	}

	public static long insertMany(List<Cart> entities) {
		return DBUtils.insertMany(entities);
	}

	public static Cart updateOne(Cart entity) {
		return DBUtils.updateOne(entity);
	}

	public static long updateMany(List<Cart> entities) {
		return DBUtils.updateMany(entities);
	}

	public static long deleteOne(long id) {
		return DBUtils.deleteOne(Cart.class, id);
	}

	public static long deleteMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Cart");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	public static long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Cart.class, ids);
	}

}
