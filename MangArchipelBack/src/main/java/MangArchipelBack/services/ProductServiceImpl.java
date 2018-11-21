package MangArchipelBack.services;

import java.util.Collection;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaContext;
import org.springframework.data.jpa.repository.Query;
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

// Recherche de produits par critères
	@Override
	public List<Product> searchProducts(String productName, String brand, Double price, String productType,
		Integer stock, String description) {
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

		if (!StringUtils.isEmpty(description)) {
			query.where(builder.equal(root.get("description"), description));
		}
		
		TypedQuery<Product> userQuery = em.createQuery(query);
		
		return userQuery.getResultList();	
		
	}
   
// Récuperer tous les produits
	@Override
	public Collection<Product> getAllProducts() {
		return pRepo.findAll();
	}

// Récuperer un produit par son ID
	@Override
	public Product getProduct(Long id) {
		return pRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produit", "id", id));
	}

// Enregistrer produit dans la BDD
	@Override
	public Product save(Product product) {
		return pRepo.save(product);
	}
	
// Supprimer produit dans la BDD
	@Override
	public void delete(Long id) {
		pRepo.deleteById(id);
	}
	
// Récuperer les produits par le nom	
	@Override
	public Collection<Product> findByProductName(String productName) {
		return pRepo.findByProductName(productName);
	}

// Récuperer les produits par la marque	
	@Override
	public Collection<Product> findByBrand(String brand) {
		return pRepo.findByBrand(brand);
	}

// Récuperer les produits par le prix	
	@Override
	public Collection<Product> findByPrice(Double price) {
		return pRepo.findByPrice(price);
	}

// Récuperer les produits par le type de produit
	@Override
	public Collection<Product> findByProductType(String productType) {
		return pRepo.findByProductType(productType);
	}

// Récupérer le stock d'un produit
	@Override
	public Integer getStock(Product product) {
		return product.getStock();
	}

    public Boolean setVisible(long id ,boolean visible) {
    	Product product = pRepo.getOne(id);
    	product.setVisible(visible);
    	Product productRecu = pRepo.save(product);
    	return productRecu.isVisible();
    }
}
