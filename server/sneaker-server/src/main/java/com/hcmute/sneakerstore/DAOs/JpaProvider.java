package com.hcmute.sneakerstore.DAOs;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JpaProvider {

	private static class JpaProviderHelper {
		public static final EntityManagerFactory emf = Persistence
				.createEntityManagerFactory("sneakerdb");
	}

	public static EntityManagerFactory getEmFactory() {
		return JpaProviderHelper.emf;
	}

	public static EntityManager getEntityManager() {
		return getEmFactory().createEntityManager();
	}
}