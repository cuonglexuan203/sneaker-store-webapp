package com.hcmute.sneakerstore.data;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.QueryException;

import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.Cleanup;

public class DBUtils {

	// Query

	public static <T> List<T> getResultList(TypedQuery<T> query) {

		if (query == null)
			return null;

		List<T> result = null;
		try {
			result = query.getResultList();
		} catch (NoResultException ex) {
//			ex.printStackTrace();
			return null;
		} catch (QueryException ex) {
//			ex.printStackTrace();
			return null;
		}
		return result;
	}

	public static <T> T getSingleResult(TypedQuery<T> query) {

		if (query == null)
			return null;

		T result = null;

		try {
			result = query.getSingleResult();
		} catch (NoResultException ex) {
//			ex.printStackTrace();
			return null;
		} catch (QueryException ex) {
//			ex.printStackTrace();
			return null;
		}
		return result;
	}

	public static long executeUpdateOrDelete(Query query, EntityTransaction tran) {

		if (query == null)
			return 0;

		long result = 0;

		tran.begin();
		try {
			result = query.executeUpdate();
			tran.commit();
		} catch (NoResultException ex) {

//			ex.printStackTrace();
			tran.rollback();
			return 0;
		} catch (QueryException ex) {
//			ex.printStackTrace();
			tran.rollback();
			return 0;
		}
		return result;
	}

	// CRUD

	public static <T> long insertOne(T entity) {
		
		final long ZERO = 0;
		final long ONE = 1;
		//
		if (entity == null)
			return ZERO;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();

		tran.begin();
		try {
			em.persist(entity);
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return ZERO;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return ZERO;
		}
		return ONE;
	}

	public static <T> long insertMany(List<T> entities) {
		final long ZERO = 0;
		//
		if (ValidationUtils.isNullOrEmpty(entities))
			return ZERO;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		long count = 0;
		tran.begin();
		try {
			for (T entity : entities) {
				em.persist(entity);
				count++;
			}
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return ZERO;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return ZERO;
		}
		return count;
	}

	public static <T> T updateOne(T entity) {
		if (entity == null)
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		T result = null;
		tran.begin();
		try {
			result = em.merge(entity);
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return null;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return null;
		}
		return result;
	}

	public static <T> List<T> updateMany(List<T> entities) {

		if (ValidationUtils.isNullOrEmpty(entities))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		List<T> result = new ArrayList<T>();
		tran.begin();
		try {
			for (T entity : entities) {
				result.add(em.merge(entity));
			}
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return null;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return null;
		}
		return entities;
	}

	public static <T> long deleteOne(T entity) {
		
		final long ZERO = 0;
		final long ONE = 1;
		//
		if (entity == null)
			return ZERO;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		
		tran.begin();
		try {
			em.remove(entity);
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return ZERO;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return ZERO;
		}
		return ONE;
	}

	public static <T> long deleteMany(List<T> entities) {

		long count = 0;
		final long ZERO = 0;
		//
		if (ValidationUtils.isNullOrEmpty(entities))
			return ZERO;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		
		tran.begin();
		try {
			for (T entity : entities) {
				em.remove(entity);
				count++;
			}
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return ZERO;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return ZERO;
		}
		return count;
	}

}
