package com.hcmute.sneakerstore.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileUtils {
	public static String getFileContent(String path) {
		String content = null;
		try {
			content = new String(Files.readAllBytes(Path.of(path)));
		} catch (IOException e) {
//			e.printStackTrace();
			return null;
		}
		
		return content;
	}
}
