package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.enums.Role;
import com.hcmute.sneakerstore.data.DAOs.AccountDao;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebServlet("/testAccountDao")
public class TestAccountDaoServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain");
		StringBuilder output = new StringBuilder();

		try {
			// Test insertOne
			Account newAccount = Account.builder()
					.username("newUser")
					.password("newPass")
					.role(Role.USER)
					.build(); // Properly
								// populate
								// the
								// new
								// Account
								// object
			long newAccountId = AccountDao.insertOne(newAccount);
			output.append("insertOne: Inserted account with ID: ")
					.append(newAccountId)
					.append("\n");

			// Test insertMany
			Account newAccount2 = Account.builder()
					.username("user2")
					.password("pass2")
					.role(Role.USER)
					.build();
			Account newAccount3 = Account.builder()
					.username("user3")
					.password("pass3")
					.role(Role.USER)
					.build();
			Account newAccount4 = Account.builder()
					.username("user4")
					.password("pass4")
					.role(Role.USER)
					.build();
			Account newAccount5 = Account.builder()
					.username("user5")
					.password("pass5")
					.role(Role.USER)
					.build();
			long insertManyCount = AccountDao.insertMany(Arrays.asList(
					newAccount2, newAccount3, newAccount4, newAccount5));
			output.append("insertMany: Inserted count: ")
					.append(insertManyCount)
					.append("\n");

			// Test selectOne
			Account account = AccountDao.selectOne(newAccountId); // Use the ID
																	// from the
																	// insert
																	// test
			output.append("selectOne: ")
					.append(account != null ? account.toString()
							: "No account found")
					.append("\n");

			// Test selectMany
			List<Account> accounts = AccountDao.selectMany();
			output.append("selectMany: ")
					.append(accounts != null ? accounts.toString()
							: "No accounts found")
					.append("\n");

			// Test selectMany with IDs
			List<Long> ids = List.of(2l, 4l, 5l); // Use IDs from the previous
													// inserts
			List<Account> accountsByIds = AccountDao.selectMany(ids);
			output.append("selectManyByIds: ")
					.append(accountsByIds != null ? accountsByIds.toString()
							: "No carts found")
					.append("\n");

//             Test updateOne
			if (account != null) {
				account.setRole(Role.ADMIN); // Example update action
				Account updatedAccount = AccountDao.updateOne(account);
				output.append("updateOne: ")
						.append(updatedAccount)
						.append("\n");
			}
			accounts = AccountDao.selectMany();
			output.append("selectMany after updateOne: ")
					.append(accounts != null ? accounts.toString()
							: "No accounts found")
					.append("\n");
			//
//            Test updateMany
			newAccount5.setRole(Role.ADMIN);
			newAccount3.setPassword("Password3_change");
			List<Account> updatedAccounts = List.of(newAccount5, newAccount3);
			long updatedCount = AccountDao.updateMany(updatedAccounts);
			output.append("updateMany: ")
					.append(updatedCount)
					.append("\n");

			accounts = AccountDao.selectMany();
			output.append("selectMany after updateMany: ")
					.append(accounts != null ? accounts.toString()
							: "No accounts found")
					.append("\n");

//
//            // Test deleteOne
			long ok = AccountDao.deleteOne(newAccountId); // Use the ID from the
															// insert test
			output.append("deleteOne: ")
					.append(ok == 1 ? "Success" : "Failed")
					.append("\n");
//
//            // Test deleteManyByIds
//            if (!ids.isEmpty()) {
//                long deleteManyByIdsCount = AccountDao.deleteMany(ids);
//                output.append("deleteManyByIds: Deleted ").append(deleteManyByIdsCount).append(" carts").append("\n");
//            }
//
//            // Test deleteMany
//            long deleteManyCount = AccountDao.deleteMany();
//            output.append("deleteMany: Deleted ").append(deleteManyCount).append(" carts").append("\n");

		} catch (Exception e) {
			output.append("An error occurred: ")
					.append(e.getMessage());
		}

		response.getWriter()
				.print(output.toString());
	}
}
