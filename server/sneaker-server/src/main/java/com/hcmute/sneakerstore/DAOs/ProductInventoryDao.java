package com.hcmute.sneakerstore.DAOs;

import java.util.List;

import com.hcmute.sneakerstore.model.ProductInventory;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class ProductInventoryDao implements GenericDao<ProductInventory> {

	@Override
	public ProductInventory findById(long id) {
		return DBUtils.selectOne(ProductInventory.class, id);
	}

	@Override
	public List<ProductInventory> findAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		TypedQuery<ProductInventory> query = em.createQuery(
				"select pi from ProductInventory pi", ProductInventory.class);
		return DBUtils.getResultList(query);
	}

	@Override
	public List<ProductInventory> findMany(List<Long> ids) {

		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		String str = new StringBuilder().append(
				"select pi from ProductInventory pi where pi.id in :ids")
				.toString();
		TypedQuery<ProductInventory> query = em.createQuery(str,
				ProductInventory.class);
		query.setParameter("ids", ids);

		return DBUtils.getResultList(query);
	}

	@Override
	public long add(ProductInventory entity) {
		return DBUtils.insertOne(entity);
	}

	@Override
	public long addMany(List<ProductInventory> entities) {
		return DBUtils.insertMany(entities);
	}

	@Override
	public ProductInventory update(ProductInventory entity) {
		return DBUtils.updateOne(entity);
	}

	@Override
	public long updateMany(List<ProductInventory> entities) {
		return DBUtils.updateMany(entities);
	}

	@Override
	public long delete(long id) {
		return DBUtils.deleteOne(ProductInventory.class, id);
	}

	@Override
	public long deleteAll() {
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		Query query = em.createQuery("delete from ProductInventory");
		return DBUtils.executeUpdateOrDelete(em, query);
	}

	@Override
	public long deleteMany(List<Long> ids) {
		return DBUtils.deleteMany(ProductInventory.class, ids);
	}
}
