package com.hcmute.sneakerstore.filters;

import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.model.enums.Role;
import com.hcmute.sneakerstore.services.AuthService;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebFilter(filterName = "AuthorizationFilter")
public class AuthorizationFilter extends HttpFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) req;
        HttpServletResponse httpResponse = (HttpServletResponse) res;
        HttpSession session = httpRequest.getSession(false);

        User user = (session != null) ? (User) session.getAttribute(AuthService.AuthenticatedUserKey.USER.getStoredKey()) : null;
        String userRole = (session != null) ? (String) session.getAttribute(AuthService.AuthenticatedUserKey.ROLE.getStoredKey()) : null;
        String requestURI = httpRequest.getRequestURI();

        if (user != null && isAuthorized(userRole, requestURI)) {
            chain.doFilter(httpRequest, httpResponse); // User is authorized
        }
        else if(isAuthorized("visitor", requestURI)) {
            chain.doFilter(httpRequest,httpResponse);
        }
        else if (!httpRequest.getMethod().toString().equals(("OPTIONS"))) {
            HttpResponseHandler.sendErrorResponse(httpResponse, httpResponse.SC_NOT_FOUND, StatusMessage.SM_NOT_FOUND.getDescription());
        }
    }

    private boolean isAuthorized(String role, String requestURI) {
        // Administrator
        if(role.equals(Role.ADMIN.toString())){
            return true;
        }
        else if(requestURI.contains("/admin")){
            return false;
        }
        // normal user
        if(role.equals(Role.USER.toString())){
            System.out.println("normal user");
            return true;
        }
        // unknown user
        String[] allowUnknownUserEndpoints = {"/products", "/search", "/auth"};
        for(String allowedEndpoints: allowUnknownUserEndpoints){
            if(requestURI.contains(allowedEndpoints)){
                return true;
            }
        }
        return false;
    }
}