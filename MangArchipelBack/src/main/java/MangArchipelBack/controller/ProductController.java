package MangArchipelBack.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import MangArchipelBack.model.Product;
import MangArchipelBack.services.security.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired 
	private ProductService pService;
	
	
	@CrossOrigin("*")
    @GetMapping("/")
	public Collection<Product> getProducts() {
		return pService.getAllProducts();
	}
	
	@CrossOrigin("*")
    @GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return pService.getProduct(id);
	}
	
	@CrossOrigin("*")
    @GetMapping("/product/{productName}")
	public Product getProductByName(@PathVariable String productName) {
		return pService.findbyName(productName);
	}
	
	@CrossOrigin("*")
    @GetMapping("/stock/{id}")
	public Integer getStockByProduct(@PathVariable Long id) {
		Product product = pService.getProduct(id);
		return product.getStock();
	}
	
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin("*")
	@PostMapping("/") 
	public Product createProduct(@RequestBody Product p){
		return pService.save(p);		
	}
	
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin("*")
	@PutMapping("/{id}") 
	public Product updateProduct(@PathVariable(value="id") Long id, @Valid @RequestBody Product p) {
		Product product = pService.getProduct(id);
		product.setBrand(p.getBrand());
		product.setProductName(p.getProductName());
		product.setProductType(p.getProductType());
		product.setPrice(p.getPrice());
		product.setStock(p.getStock());
		Product pUpdate = pService.save(product);
		return pUpdate;
	}
	
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin("*")
	@DeleteMapping("/{id}") 
	public void deleteProduct(@PathVariable Long id) {
		pService.delete(id);
	}
	
}
