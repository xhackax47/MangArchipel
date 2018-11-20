package MangArchipelBack.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.model.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long>{
	
    Collection<Product> findByProductName(String productName);
    Collection<Product> findByBrand(String brand);
    Collection<Product> findByPrice(Double price);
    Collection<Product> findByProductType(String productType);
}
