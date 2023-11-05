package com.hcmute.sneakerstore.utils;

import java.util.Iterator;

public class CollectionUtils {
	public static <T> T aggregate(Iterator<T> iter) {
		while(iter.hasNext()) {
			T i = iter.next();
			if(i instanceof Integer) {
				
			}
		}
	}
}
