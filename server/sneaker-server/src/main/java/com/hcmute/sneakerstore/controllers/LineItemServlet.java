package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DTOs.LineItemDelReqDto;
import com.hcmute.sneakerstore.DTOs.LineItemQtyUpdateReqDto;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.services.LineItemService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.PathParams;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;

@WebServlet("/lineitems/*")
public class LineItemServlet extends HttpServlet {
	private LineItemService lineItemService;

	@Override
	public void init() {
		lineItemService = new LineItemService();
	}

	// get line item
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PathParams pathParam = new PathParams(req);
		String lineItemIdStr = pathParam.get(0);
		//
		if (!ValidationUtils.isNullOrEmpty(lineItemIdStr)) {
			long lineItemId = 0;
			try {
				lineItemId = Long.parseLong(lineItemIdStr);

			} catch (NumberFormatException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
			// Business processing
			LineItem lineItem = lineItemService.getLineItem(lineItemId);
			if (lineItem != null) {
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, lineItem);
				return;
			}

		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());

	}

	// Update lineItem quantity
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Preprocessing raw request
		String bodyStr = (String) req.getAttribute("body");
		if (!ValidationUtils.isNullOrEmpty(bodyStr)) {
			try {
				LineItemQtyUpdateReqDto bodyObj = GsonProvider.getGsonInstance().fromJson(bodyStr,
						LineItemQtyUpdateReqDto.class);
				if (bodyObj != null) {
					// Business processing
					boolean result = lineItemService.updateLineItemQuantity(bodyObj);
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

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PathParams pathParam = new PathParams(req);
		String lineItemIdStr = pathParam.get(0);
		if (!ValidationUtils.isNullOrEmpty(lineItemIdStr)) {
			try {
				long lineItemId = Long.parseLong(lineItemIdStr);
				// Business processing
				// delete one
				if (lineItemId > 0) {
					boolean result = lineItemService.deleteLineItem(lineItemId);
					if (result) {
						HttpResponseHandler.sendSuccessResponse(res, res.SC_OK, StatusMessage.SM_OK.getDescription());
						return;
					}

				}
				// delete many
				else if (lineItemId == 0) {

					String body = (String) req.getAttribute("body");
					if (!ValidationUtils.isNullOrEmpty(body)) {
						LineItemDelReqDto deleteManyRequestBody = GsonProvider.getGsonInstance().fromJson(body,
								LineItemDelReqDto.class);
						//
						if (deleteManyRequestBody != null) {
							boolean result = lineItemService.deleteLineItems(deleteManyRequestBody);
							if (result) {
								HttpResponseHandler.sendSuccessResponse(res, res.SC_OK,
										StatusMessage.SM_OK.getDescription());
								return;
							}
						}

					}

				}
			} catch (NumberFormatException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

}
