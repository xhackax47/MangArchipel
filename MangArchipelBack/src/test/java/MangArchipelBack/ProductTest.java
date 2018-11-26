package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.ProductController;
import MangArchipelBack.model.Product;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ProductTest {
	
	@Autowired
	private ProductController pC;
	
	
	@Test
	public void create() {
		Product p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		
		assertNotNull(p);
		assertThat(pC.createProduct(p));


	}
	
	@Test
	public void read() {		
		Product p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		pC.createProduct(p);
		pC.createProduct(p);
		
		assertThat(pC.getProductById(p.getId()));
		assertThat(pC.getStockByProduct(p.getId()));

	}
	
	@Test
	public void update() {
		Product p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		pC.createProduct(p);
		
		Product pUpdate = new Product();
		pUpdate.setProductName("TEST");
		pUpdate.setBrand("TEST");
		pUpdate.setDescription("TEST");
		pUpdate.setPrice(0.1);
		pUpdate.setProductType("TEST");
		pUpdate.setStock(0);
		
		assertThat(pC.updateProduct(p.getId(), pUpdate));
	}
	
	@Test
	public void delete() {
		// CREER PRODUIT ID 1000 DANS BDD POUR TEST
		Product p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		pC.createProduct(p);
		
		assertThat(pC.deleteProduct(p.getId()));
	}
	
	@Test
	public void criteria() {		
		Product p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		pC.createProduct(p);

		assertThat(pC.getProducts(p.getProductName(), null, null, null, null, null));
		assertThat(pC.getProducts(null, p.getBrand(), null, null, null, null));
		assertThat(pC.getProducts(null, null, p.getPrice(), null, null, null));
		assertThat(pC.getProducts(null, null, null, p.getProductType(), null, null));
		assertThat(pC.getProducts(null, null, null, null, p.getStock(), null));
		assertThat(pC.getProducts(null, null, null, null, null, p.getDescription()));
	}
	

}
