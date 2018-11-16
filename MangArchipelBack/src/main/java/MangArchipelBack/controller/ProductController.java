package MangArchipelBack.controller;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import MangArchipelBack.exception.ResourceNotFoundException;
import MangArchipelBack.model.Product;
import MangArchipelBack.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	private ProductRepository pRepo;
	
	@CrossOrigin("*")
    @GetMapping("/")
	public Collection<Product> getAllProducts() {
		return pRepo.findAll();
	}
	
	@CrossOrigin("*")
    @GetMapping("/product/{id}")
	public Optional<Product> getProductById(@PathVariable Long id) {
		return pRepo.findById(id);
	}
	
	@CrossOrigin("*")
	@PostMapping("/") 
	public Product createProduct(@RequestBody Product p){
		return pRepo.save(p);		
	}
	
	@CrossOrigin("*")
	@PutMapping("/{id}") 
	public Product updateProduct(@PathVariable(value="id") Long id, @Valid @RequestBody Product p) {
		Product product = pRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produit", "id", id));
		product.setBrand(p.getBrand());
		product.setProductName(p.getProductName());
		product.setProductType(p.getProductType());
		product.setPrice(p.getPrice());
		Product pUpdate = pRepo.save(product);
		return pUpdate;
	}
	
	@CrossOrigin("*")
	@DeleteMapping("/{id}") 
	public void deleteProduct(@PathVariable Long id) {
		pRepo.deleteById(id);
	}
	
}
