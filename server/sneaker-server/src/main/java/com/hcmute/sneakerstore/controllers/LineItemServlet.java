package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DAOs.CartDao;
import com.hcmute.sneakerstore.data.DAOs.LineItemDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
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
			LineItem lineItem = LineItemDao.selectOne(lineItemId);
			if (lineItem != null) {
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, lineItem);
				return;
			}

		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());

	}

	@Data
	private class UpdateQuantityRequestBody {
		private long lineItemId;
		private int quantity;
	}

	// Update lineItem quantity
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String bodyStr = (String) req.getAttribute("body");
		if (!ValidationUtils.isNullOrEmpty(bodyStr)) {
			try {
				UpdateQuantityRequestBody bodyObj = GsonProvider.getGsonInstance().fromJson(bodyStr,
						UpdateQuantityRequestBody.class);
				if (bodyObj != null) {
					long lineItemId = bodyObj.getLineItemId();
					int quantity = bodyObj.getQuantity();
					//
					if (lineItemId > 0 && quantity > 0) {
						LineItem lineItem = LineItemDao.selectOne(lineItemId);
						if (lineItem != null) {
							lineItem.setQuantity(quantity);
							LineItem updatedLineItem = LineItemDao.updateOne(lineItem);
							if (updatedLineItem != null) {
								HttpResponseHandler.sendSuccessResponse(res, res.SC_OK,
										StatusMessage.SM_UPDATED.getDescription());
								return;
							}

						}
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

	@Data
	private class DeleteManyRequestBody {
		private long[] lineItemIds;
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		PathParams pathParam = new PathParams(req);
		String lineItemIdStr = pathParam.get(0);
		if (!ValidationUtils.isNullOrEmpty(lineItemIdStr)) {
			try {
				long lineItemId = Long.parseLong(lineItemIdStr);
				if (lineItemId > 0) {
					LineItem lineItem = LineItemDao.selectOne(lineItemId);
					if (lineItem != null) {
						Cart cart = lineItem.getCart();
						cart.removeLineItem(lineItem);
						CartDao.updateOne(cart);
						HttpResponseHandler.sendSuccessResponse(res, res.SC_OK, StatusMessage.SM_OK.getDescription());
						return;
					}
				} else if (lineItemId == 0) {
					
					String body = (String) req.getAttribute("body");
					if (!ValidationUtils.isNullOrEmpty(body)) {
						DeleteManyRequestBody deleteManyRequestBody = GsonProvider.getGsonInstance().fromJson(body,
								DeleteManyRequestBody.class);
						//
						if (deleteManyRequestBody != null) {
							long[] lineItemIds = deleteManyRequestBody.getLineItemIds();
							if (lineItemIds != null) {
								for (long l : lineItemIds) {
									if (l > 0) {
										LineItem lineItem = LineItemDao.selectOne(l);
										if (lineItem != null) {
											Cart cart = lineItem.getCart();
											cart.removeLineItem(lineItem);
											CartDao.updateOne(cart);
										}
									}
								}
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
