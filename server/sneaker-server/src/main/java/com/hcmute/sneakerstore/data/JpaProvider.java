package com.hcmute.sneakerstore.data;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class JpaProvider{
	private JpaProvider() {}
	
	private static class JpaProviderHelper{
		public static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakerdb");
	}
	public static EntityManagerFactory getEmFactory() {
		return JpaProviderHelper.emf;
	}
	
	public static EntityManager getEntityManager() {
		return getEmFactory().createEntityManager();
	}
}