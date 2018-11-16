package MangArchipelBack.services.security;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.Product;

import java.util.Collection;

@Validated
public interface ProductService {

    public Collection<Product> getAllProducts();
    public Product getProduct(Long id);
    public Product findbyName(String name);
    public Integer getStock(Product product);
    public Product save(Product product);
    public void delete(Long id);
}
