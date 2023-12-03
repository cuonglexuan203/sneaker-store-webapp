package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import java.util.List;

import com.hcmute.sneakerstore.DTOs.PurchaseReqDto;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Location;
import com.hcmute.sneakerstore.services.PurchaseService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/purchase")
public class PurchaseServlet extends HttpServlet {

	private PurchaseService purchaseService;

	@Override
	public void init() {
		purchaseService = new PurchaseService();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String body = (String) req.getAttribute("body");
		//
		if (!ValidationUtils.isNullOrEmpty(body)) {
			PurchaseReqDto requestBody = GsonProvider.getGsonInstance().fromJson(body, PurchaseReqDto.class);
			//
			if (requestBody != null) {
				long userId = requestBody.getUserId();
				List<LineItem> lineItems = requestBody.getLineItems();
				Location address = requestBody.getAddress();
				//
				if (userId > 0 && !ValidationUtils.isNullOrEmpty(lineItems) && address != null) {
					// Business processing
					String orderConfirmationFilePath = getServletContext().getRealPath("assets/mails/order_confirmation.html");
					boolean result = purchaseService.purchase(userId, lineItems, address, orderConfirmationFilePath);
					if (result) {
						HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_CREATED,
								StatusMessage.SM_CREATED.getDescription());
						return;
					}

				}
			}
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}
}
