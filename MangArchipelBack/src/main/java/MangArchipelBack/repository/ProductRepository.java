package MangArchipelBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.model.Product;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long>{
	
    Product findByProductName(String productName);

}
