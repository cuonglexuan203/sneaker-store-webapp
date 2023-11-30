package com.hcmute.sneakerstore.DAOs;

import java.util.List;

public interface GenericDao<T> {
	T findById(long id);

	List<T> findAll();

	List<T> findMany(List<Long> ids);

	long add(T i);

	long addMany(List<T> items);

	T update(T i);

	long updateMany(List<T> items);

	long delete(long id);

	long deleteAll();

	long deleteMany(List<Long> items);
}
