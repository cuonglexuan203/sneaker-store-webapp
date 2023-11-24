package com.hcmute.sneakerstore.data;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.QueryException;

import com.hcmute.sneakerstore.business.Identifiable;
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

	public final static long FAILED_ID = -1l;

	/**
	 * @param <T>   a generic type which extends Identifiable interface
	 *              (Business entities contain getId() method )
	 * @param query query a TypedQuery type object which contains the query
	 *              string
	 * @return a result list which returned from the query
	 */
	public static <T extends Identifiable> List<T> getResultList(
			TypedQuery<T> query) {

		if (query == null) {
			return null;
		}

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

	/**
	 * @param <T>   a generic type which extends Identifiable interface
	 *              (Business entities contain getId() method )
	 * @param query a TypedQuery type object which contains the query string
	 * @return a single result which is selected in the query
	 */
	public static <T extends Identifiable> T getSingleResult(
			TypedQuery<T> query) {

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

	/**
	 * Used to execute the update or delete statement Ensure that the query
	 * parameter is created from the em parameter
	 * 
	 * @param em    an instance of entity manager
	 * @param query a Query type object which contains the query string
	 * @return the number of entities updated or deleted
	 */
	public static long executeUpdateOrDelete(EntityManager em, Query query) {

		if (query == null)
			return 0;

		long result = 0;
		EntityTransaction tran = em.getTransaction();
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

	/**
	 * @param <T>         a generic type which extends Identifiable interface
	 *                    (Business entities contain getId() method )
	 * @param entityClass the result class
	 * @param id          the id of selected entity
	 * @return an entity contains id
	 */
	public static <T extends Identifiable> T selectOne(Class<T> entityClass,
			long id) {
		if (id <= 0)
			return null;

		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		//
		T managedEntity = null;
		tran.begin();
		try {
			managedEntity = em.find(entityClass, id);
			tran.commit();
		} catch (Exception e) {
			tran.rollback();
			return null;
		}
		return managedEntity;
	}

	// return list of finding entities

	/**
	 * @param <T>         a generic type which extends Identifiable interface
	 *                    (Business entities contain getId() method )
	 * @param entityClass the result class
	 * @param ids         the id of selected entities
	 * @return a result list contains ids being selected
	 */
	public static <T extends Identifiable> List<T> selectMany(
			Class<T> entityClass, List<Long> ids) {
		if (ValidationUtils.isNullOrEmpty(ids))
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		//
		List<T> managedEntities = new ArrayList<>();
		tran.begin();
		try {
			for (long id : ids) {
				T foo = em.find(entityClass, id);
				if (foo != null) {
					managedEntities.add(foo);
				}
			}
			tran.commit();
		} catch (Exception e) {
			tran.rollback();
			return null;
		}
		return managedEntities;
	}

	/**
	 * @param <T>    a generic type which extends Identifiable interface
	 *               (Business entities contain getId() method )
	 * @param entity the entity need to insert
	 * @return the id of inserted entity
	 */
	public static <T extends Identifiable> long insertOne(T entity) {

		//
		if (entity == null)
			return FAILED_ID;
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
			return FAILED_ID;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return FAILED_ID;
		}
		return entity.getId();
	}

	/**
	 * @param <T>      a generic type which extends Identifiable interface
	 *                 (Business entities contain getId() method )
	 * @param entities a list of entities need to insert
	 * @return the number of inserted entities
	 */
	public static <T extends Identifiable> long insertMany(List<T> entities) {
		long count = 0;
		//
		if (ValidationUtils.isNullOrEmpty(entities))
			return 0;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();

		tran.begin();
		try {
			for (T entity : entities) {
				em.persist(entity);
				count++;
			}
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return 0;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return 0;
		}
		return count;
	}

	/**
	 * @param <T>    a generic type which extends Identifiable interface
	 *               (Business entities contain getId() method )
	 * @param entity the entity need to update
	 * @return the updated entity
	 */
	public static <T extends Identifiable> T updateOne(T entity) {
		//
		if (entity == null)
			return null;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		T managedEntity = null;
		tran.begin();
		try {
			managedEntity = em.merge(entity);
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return null;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return null;
		}
		return managedEntity;
	}

	/**
	 * @param <T>      a generic type which extends Identifiable interface
	 *                 (Business entities contain getId() method )
	 * @param entities a list of entities need to update
	 * @return the number of updated entities
	 */
	public static <T extends Identifiable> long updateMany(List<T> entities) {
		long count = 0l;
		//
		if (ValidationUtils.isNullOrEmpty(entities))
			return 0;
		//
		for (T entity : entities) {
			updateOne(entity);
			count++;
		}
		return count;
	}

	/**
	 * @param <T>         a generic type which extends Identifiable interface
	 *                    (Business entities contain getId() method )
	 * @param entityClass the result class
	 * @param id          id of the entity want to delete
	 * @return status: 0: failure, 1: successful
	 */
	public static <T extends Identifiable> long deleteOne(Class<T> entityClass,
			long id) {

		//
		if (id <= 0)
			return FAILED_ID;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		long deletedEntityId = FAILED_ID;
		//
		tran.begin();
		try {
//			The entity must be managed in the current persistence context: the entity must be either retrieved from the database in the current transaction 
//			or made managed via merge() if it's detached
			T managedEntity = em.find(entityClass, id);
			if (managedEntity != null) {
				deletedEntityId = managedEntity.getId();
				em.remove(managedEntity);
				tran.commit();
			}
		} catch (PersistenceException e) {

			tran.rollback();
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
		}
		return deletedEntityId;
	}

	/**
	 * @param <T>      a generic type which extends Identifiable interface
	 *                 (Business entities contain getId() method )
	 * @param entities a list of entities need to delete
	 * @return the number of deleted entities
	 */
	public static <T extends Identifiable> long deleteMany(Class<T> entityClass,
			List<Long> ids) {
		long count = 0l;
		//
		if (ValidationUtils.isNullOrEmpty(ids))
			return 0;
		//
		@Cleanup
		EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		List<T> deletedEntities = new ArrayList<>();
		tran.begin();

		try {
			for (long id : ids) {
				T foo = em.find(entityClass, id);
				if (foo != null) {
					deletedEntities.add(foo);
				}
			}
			for (T entity : deletedEntities) {
				em.remove(entity);
				count++;
			}
			tran.commit();
		} catch (PersistenceException e) {

			tran.rollback();
			return 0;
		} catch (Exception e) {
//			e.printStackTrace();
			tran.rollback();
			return 0;
		}
		return count;
	}

}
