package MangArchipelBack.services.security;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.Product;

import java.util.Collection;
import java.util.List;

@Validated
public interface ProductService {

	List<Product> searchProducts(String productName, String brand, Double price, String productType, Integer stock, String description);
    Collection<Product> getAllProducts();
    Product getProduct(Long id);
    Integer getStock(Product product);
    
    Collection<Product> findByProductName(String productName);
    Collection<Product> findByBrand(String brand);
    Collection<Product> findByPrice(Double price);
    Collection<Product> findByProductType(String productType);
    
    Product save(Product product);
    void delete(Long id);
}
