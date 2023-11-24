package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.List;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.utils.FileUtils;
import com.hcmute.sneakerstore.utils.GsonProvider;

@WebServlet("/test")
public class TestDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
//		int a = 0;
////
//		@Cleanup
//		EntityManager em = JpaProvider.getEntityManager();
//		EntityTransaction tran = em.getTransaction();
//		Query query = em.createQuery("delete from ProductInventory");
//		DBUtils.executeUpdateOrDelete(query, tran);

//			tran.begin();
//			for(int i = 0; i < 1; i++) {
//				User user = User.builder().firstName("Lxc")
//													.lastName("Non")
//													.gender(true)
//													.birthday(LocalDate.now())
//													.phoneNumber("25646161")
//													.address(new Location("VN", "ThuDuc", "HCM"))
//													.build();

//				
//				em.persist(user);
//			}
			Product p = Product.builder()
								.brand("Hamiing")
								.name("Air force 1")
								.ean("1234122")
								.price(123.11f)
								.releaseDate(LocalDate.now())
								.imageUrl("http://image")
								.build();

			
//			ProductInventory pi = ProductInventory.builder()
//									.productAmount(12)
//									.color(Color.GRAY)
//									.size(14)
//									.build();
//			ProductInventory pi2 = ProductInventory.builder()
//					.productAmount(13)
//					.color(Color.GRAY)
//					.size(19)
//					.build();
//			ProductInventory pi3 = ProductInventory.builder()
//					.productAmount(1)
//					.color(Color.RED)
//					.size(14)
//					.build();
//			
//			p.addProductInventory(pi);
//			p.addProductInventory(pi2);
//			p.addProductInventory(pi3);
			
//			em.persist(p);
//			a = p.getProductCountBySize(17);
//			tran.commit();
//		String a = new String(Files.readAllBytes(Paths.get(
//				"D:\\WorkSpace\\Projects\\sneaker-web-app\\server\\sneaker-server\\src\\main\\java\\com\\hcmute\\sneakerstore\\data\\prepared-data\\data.json")));
//		Product p = Product.builder()
//				.brand("Hamiing")
//				.name("Air force 1")
//				.ean("2342")
//				.price(123.11f)
//				.releaseDate(LocalDate.now())
//				.imageUrl("http://image")
//				.build();
//		
//		Account newAccount = Account.builder()
//				.username("newUser")
//				.password("newPass")
//				.role(Role.USER)
//				.build();
//		
			
		
//		Product newp = gson.fromJson(productstr, Product.class);
//		String product = gson.toJson(p);
		String productsStr = FileUtils.getFileContent(
				"D:\\WorkSpace\\Projects\\sneaker-web-app\\server\\sneaker-server\\src\\main\\java\\com\\hcmute\\sneakerstore\\data\\prepareddata\\products.json");
		Type productListType = new TypeToken<List<Product>>(){}.getType();
		List<Product> products = GsonProvider.getGsonInstance().fromJson(productsStr, productListType);
		
		ProductDao.insertMany(products);
		ProductDao.insertOne(p);
		 for(Product pp: products) {
			 response.getWriter().write(pp.toString() + "\n\n");
			 
		 }
//		response.getWriter()
//				.write(123);
	}

}
