package com.hcmute.sneakerstore.filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import java.io.IOException;

import org.apache.logging.log4j.core.util.IOUtils;

@WebFilter(filterName = "BodyParserFilter")
public class BodyParserFilter extends HttpFilter implements Filter {
       
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		
		String body = IOUtils.toString(req.getReader());
		req.setAttribute("body", body);
		chain.doFilter(req, res);
	}


}
