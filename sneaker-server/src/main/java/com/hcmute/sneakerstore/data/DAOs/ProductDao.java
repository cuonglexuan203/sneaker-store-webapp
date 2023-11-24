package com.hcmute.sneakerstore.data.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class ProductDao {

	public static Product selectOne(long id) {
		return DBUtils.selectOne(Product.class, id);
	}

	public static List<Product> selectMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Product> query = em.createQuery("select p from Product p",
				Product.class);
		return DBUtils.getResultList(query);
	}

	public static List<Product> selectMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder()
				.append("select p from Product p where p.id in :ids")
				.toString();
		TypedQuery<Product> query = em.createQuery(str, Product.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	public static long insertOne(Product entity) {
		return DBUtils.insertOne(entity);
	}

	public static long insertMany(List<Product> entities) {
		return DBUtils.insertMany(entities);
	}

	public static Product updateOne(Product entity) {
		return DBUtils.updateOne(entity);
	}

	public static long updateMany(List<Product> entities) {
		return DBUtils.updateMany(entities);
	}

	public static long deleteOne(long id) {
		return DBUtils.deleteOne(Product.class, id);
	}

	public static long deleteMany() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Product");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	public static long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Product.class, ids);
	}
}
