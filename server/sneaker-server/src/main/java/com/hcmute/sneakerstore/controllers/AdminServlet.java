package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DTOs.AddAdminProductReqDto;
import com.hcmute.sneakerstore.DTOs.UpdateLineItemQtyReqDto;
import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.DTOs.UpdateAdminProductReqDto;
import com.hcmute.sneakerstore.services.AdminService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/admin/products")
public class AdminServlet extends HttpServlet {

	private AdminService adminService;

	@Override
	public void init() {
		adminService = new AdminService();
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Business processing
		List<ProductResDto> adminProducts = adminService.getAllProducts();
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, adminProducts);
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String bodyStr = (String) req.getAttribute("body");
		if (!ValidationUtils.isNullOrEmpty(bodyStr)) {
			try {
				AddAdminProductReqDto bodyObj = GsonProvider.getGsonInstance().fromJson(bodyStr,
						AddAdminProductReqDto.class);
				if (bodyObj != null) {
					// Business processing
					boolean result = adminService.addProduct(bodyObj);
					if (result) {
						HttpResponseHandler.sendSuccessResponse(res, res.SC_CREATED,
								StatusMessage.SM_CREATED.getDescription());
						return;
					}
				}
			} catch (JsonSyntaxException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}

		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

	protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String bodyStr = (String) req.getAttribute("body");
		if (!ValidationUtils.isNullOrEmpty(bodyStr)) {
			try {
				UpdateAdminProductReqDto bodyObj = GsonProvider.getGsonInstance().fromJson(bodyStr,
						UpdateAdminProductReqDto.class);
				if (bodyObj != null) {
					// Business processing
					boolean result = adminService.updateProduct(bodyObj);
					if (result) {
						HttpResponseHandler.sendSuccessResponse(res, res.SC_OK,
								StatusMessage.SM_UPDATED.getDescription());
						return;
					}
				}
			} catch (JsonSyntaxException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}

		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String idStr = req.getParameter("id");

		if (!ValidationUtils.isNullOrEmpty(idStr)) {
			long id = 0;
			try {
				id = Long.parseLong(idStr);
			} catch (NumberFormatException err) {
				err.printStackTrace();
			}
			if (id > 0) {

				boolean result = adminService.deleteProductInventory(id);
				if (result) {
					HttpResponseHandler.sendSuccessResponse(res, res.SC_OK, StatusMessage.SM_OK.getDescription());
					return;
				}
			}

		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

}
