package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.model.Invoice;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/invoices")
public class InvoiceServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String userIdStr = req.getParameter("userId");
		//
		if (!ValidationUtils.isNullOrEmpty(userIdStr)) {
			long userId = 0;
			try {
				userId = Long.parseLong(userIdStr);
			} catch (NumberFormatException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
			User user = DaoFactory.getUserDao().findById(userId);
			if (user != null) {
				Set<Invoice> invoices = user.getInvoices();
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, invoices);
				return;
			}
		}

		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

}
