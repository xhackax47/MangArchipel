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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import MangArchipelBack.model.Product;
import MangArchipelBack.model.ProductRequest;
import MangArchipelBack.services.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired 
	private ProductService pService;
	
// Obtenir produit par productName ET/OU brand ET/OU price ET/OU productType ET/OU stock
	@CrossOrigin(origins = "*")
    @GetMapping("/")
	public Collection<Product> getProducts(
			@RequestParam(required = false) String productName, 
			@RequestParam(required = false) String brand,
			@RequestParam(required = false) Double price,
			@RequestParam(required = false) String productType,
			@RequestParam(required = false) Integer stock,
			@RequestParam(required = false) String description) {
		return pService.searchProducts(productName, brand, price, productType, stock, description);
	}
	
// Obtenir un produit par son ID
	@CrossOrigin(origins = "*")
    @GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return pService.getProduct(id);
	}
	
// Obtenir le stock d'un produit par son ID
	@CrossOrigin(origins = "*")
    @GetMapping("/{id}/stock")
	public Integer getStockByProduct(@PathVariable Long id) {
		Product product = pService.getProduct(id);
		return product.getStock();
	}
	
// Créer un produit	
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin(origins = "*")
	@PostMapping("/") 
	public Product createProduct(@RequestBody ProductRequest pr){
		
		System.out.println(pr);
		return pService.save(pr);		
	}
	
// Mettre à jour / Modifier un produit
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin(origins = "*")
	@PutMapping("/{id}") 
	public Product updateProduct(@PathVariable(value="id") Long id, @Valid @RequestBody ProductRequest pr) {
		
		Product pUpdate = pService.save(pr);
		return pUpdate;
	}
	
// Supprimer un produit
//    @Secured({"ROLE_ADMIN"})
	@CrossOrigin(origins = "*")
	@DeleteMapping("/{id}") 
	@ResponseBody
	public Boolean deleteProduct(@PathVariable Long id) {
		
		return pService.delete(id);
	}
	
	
	//Activer un produit
	//@Secured({"ROLE_ADMIN"})
	@CrossOrigin(origins = "*")
	@PostMapping("/visible/{id}") 
	public void setVisible(@PathVariable Long id, @RequestBody Boolean visible) {
		pService.setVisible(id, visible);
	}
	
	
	@CrossOrigin(origins = "*")
	@PostMapping("/image") 
	public void image(@RequestParam MultipartFile image) {
		System.out.println(image.getOriginalFilename());
		pService.sauvegardeImage(image);
	}
}