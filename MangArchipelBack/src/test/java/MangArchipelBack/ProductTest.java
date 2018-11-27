package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.ProductController;
import MangArchipelBack.model.Product;
import MangArchipelBack.repository.ProductRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ProductTest {
	
	private Product p;
	
	@Autowired
	private ProductRepository pR;
	
	@Autowired
	private ProductController pC;
	
	@Before
	public void init() {
		
		p = new Product();
		p.setProductName("TEST");
		p.setBrand("TEST");
		p.setDescription("TEST");
		p.setPrice(0.1);
		p.setProductType("TEST");
		p.setStock(0);
		
		p = pR.save(p);
	}
	
	@After
	public void destroy() {
		pR.delete(p);
	}
	
	// TEST CREATION PRODUIT
	@Test
	public void create() {

		assertNotNull(p);
		assertThat(pC.createProduct(p));
	}
	
	// TEST RECUPERATION PRODUIT ET STOCK/PRODUIT PAR ID
	@Test
	public void read() {		
		
		assertThat(pC.createProduct(p));
		assertThat(pC.getProductById(p.getId()));
		assertThat(pC.getStockByProduct(p.getId()));
	}
	
	// TEST MISE A JOUR DE PRODUIT
	@Test
	public void update() {
		
		Product pUpdate = new Product();
		pUpdate.setProductName("TEST");
		pUpdate.setBrand("TEST");
		pUpdate.setDescription("TEST");
		pUpdate.setPrice(0.1);
		pUpdate.setProductType("TEST");
		pUpdate.setStock(0);
		
		assertThat(pC.createProduct(p));
		assertThat(pC.updateProduct(p.getId(), pUpdate));
	}
	
	// TEST SUPPRESSION DE PRODUIT
	@Test
	public void delete() {
		
		assertThat(pC.deleteProduct(p.getId()));
	}
	
	// TEST DE RECHERCHE PAR CRITERES
	@Test
	public void criteria() {		
		
		assertThat(pC.createProduct(p));
		assertThat(pC.getProducts(p.getProductName(), null, null, null, null, null));
		assertThat(pC.getProducts(null, p.getBrand(), null, null, null, null));
		assertThat(pC.getProducts(null, null, p.getPrice(), null, null, null));
		assertThat(pC.getProducts(null, null, null, p.getProductType(), null, null));
		assertThat(pC.getProducts(null, null, null, null, p.getStock(), null));
		assertThat(pC.getProducts(null, null, null, null, null, p.getDescription()));
		assertThat(pC.getProducts(p.getProductName(),  p.getBrand(), p.getPrice(), p.getProductType(), p.getStock(), p.getDescription()));
		assertThat(pC.getProducts(null, null, null, null, null, null));
		
	}
	

}
