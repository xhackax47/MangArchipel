package MangArchipelBack.services.security;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import MangArchipelBack.exception.ResourceNotFoundException;
import MangArchipelBack.model.Product;
import MangArchipelBack.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository pRepo;
	
	@Autowired
	private EntityManager em;

	
    public ProductServiceImpl(ProductRepository productRepository) {
        this.pRepo = productRepository;
    }
    
	@Autowired
	public void setJpaContext(JpaContext jpaContext) {
		em = jpaContext.getEntityManagerByManagedType(Product.class);
	}

	@Override
	public List<Product> searchProducts(String productName, String brand, Double price, String productType,
			Integer stock) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<Product> query = builder.createQuery(Product.class);
		Root<Product> root = query.from(Product.class);
		
		if (!StringUtils.isEmpty(productName)) {
			query.where(builder.like(root.get("productName"), "%" + productName + "%"));
		}
		if (!StringUtils.isEmpty(brand)) {
			query.where(builder.like(root.get("brand"), "%" + brand + "%"));
		}
		if (!StringUtils.isEmpty(price)) {
			query.where(builder.equal(root.get("price"), price));
		}
		if (!StringUtils.isEmpty(productType)) {
			query.where(builder.equal(root.get("productType"), productType));
		}
		if (!StringUtils.isEmpty(stock)) {
			query.where(builder.equal(root.get("stock"), stock));
		}
		
		TypedQuery<Product> userQuery = em.createQuery(query);
		
		return userQuery.getResultList();	
		
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
	public Collection<Product> findByProductName(String productName) {
		return pRepo.findByProductName(productName);
	}

	@Override
	public Collection<Product> findByBrand(String brand) {
		return pRepo.findByBrand(brand);
	}

	@Override
	public Collection<Product> findByPrice(Double price) {
		return pRepo.findByPrice(price);
	}

	@Override
	public Collection<Product> findByProductType(String productType) {
		return pRepo.findByProductType(productType);
	}

	@Override
	public Integer getStock(Product product) {
		return product.getStock();
	}

}
