package MangArchipelBack.services.security;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.Product;

import java.util.Collection;

@Validated
public interface ProductService {

    Collection<Product> getAllProducts();
	Collection<Product> getProducts(String productName, String brand, Double price, String productType, Integer stock);
    Product getProduct(Long id);
    Integer getStock(Product product);
    
    Product findByProductName(String productName);
    Product findByBrand(String brand);
    Product findByPrice(Double price);
    Product findByProductType(String productType);
    
    Product save(Product product);
    void delete(Long id);
}
