package MangArchipelBack.services.security;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.exception.ResourceNotFoundException;
import MangArchipelBack.model.Product;
import MangArchipelBack.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository pRepo;
	
    public ProductServiceImpl(ProductRepository productRepository) {
        this.pRepo = productRepository;
    }

	@Override
	public Collection<Product> getAllProducts() {
		return pRepo.findAll();
	}

	@Override
	public Product getProduct(Long id) {
		return pRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produit", "id", id));
	}

	@Override
	public Product save(Product product) {
		return pRepo.save(product);
	}

	@Override
	public void delete(Long id) {
		pRepo.deleteById(id);
	}
	
	@Override
	public Product findByProductName(String productName) {
		return pRepo.findByProductName(productName);
	}

	@Override
	public Product findByBrand(String brand) {
		return pRepo.findByBrand(brand);
	}

	@Override
	public Product findByPrice(Double price) {
		return pRepo.findByPrice(price);
	}

	@Override
	public Product findByProductType(String productType) {
		return pRepo.findByProductType(productType);
	}

	@Override
	public Integer getStock(Product product) {
		return product.getStock();
	}

	@Override
	public Collection<Product> getProducts(String productName, String brand, Double price, String productType, Integer stock) {
		return pRepo.findAll();
	}

}
