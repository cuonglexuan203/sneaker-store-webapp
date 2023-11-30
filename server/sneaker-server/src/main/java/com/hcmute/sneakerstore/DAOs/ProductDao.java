package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class ProductDao implements GenericDao<Product> {

	@Override
	public Product findById(long id) {
		return DBUtils.selectOne(Product.class, id);
	}

	@Override
	public List<Product> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<Product> query = em.createQuery("select p from Product p",
				Product.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<Product> findMany(List<Long> ids) {

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

	@Override
	public long add(Product entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<Product> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public Product update(Product entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<Product> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(Product.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from Product");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(Product.class, ids);
	}
}
