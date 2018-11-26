package MangArchipelBack.services;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import MangArchipelBack.model.Product;
import MangArchipelBack.model.ProductRequest;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;

@Validated
public interface ProductService {

	Collection<Product> searchProducts(String productName, String brand, Double price, String productType, Integer stock, String description);
    Collection<Product> getAllProducts();
    Product getProduct(Long id);
    Integer getStock(Product product);
    
    Collection<Product> findByProductName(String productName);
    Collection<Product> findByBrand(String brand);
    Collection<Product> findByPrice(Double price);
    Collection<Product> findByProductType(String productType);
    
    Product save(ProductRequest productRequest);
    Boolean delete(Long id);
    Boolean setVisible(long id ,boolean visible);
    String sauvegardeImage(MultipartFile image, String name) throws FileNotFoundException, IOException;
}
