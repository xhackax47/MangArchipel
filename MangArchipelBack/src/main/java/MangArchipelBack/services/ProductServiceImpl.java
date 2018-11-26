package MangArchipelBack.services;

import java.awt.Image;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.Collection;

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
import org.springframework.web.multipart.MultipartFile;

import MangArchipelBack.exception.BadRequestException;
import MangArchipelBack.exception.ResourceNotFoundException;
import MangArchipelBack.model.Product;
import MangArchipelBack.model.ProductRequest;
import MangArchipelBack.repository.ProductRepository;
import MangArchipelBack.repository.OrderRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository pRepo;
	
	@Autowired
	private OrderRepository orderRepository;
	
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
	public Collection<Product> searchProducts(String productName, String brand, Double price, String productType,
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
	public Product save(ProductRequest pr) {
		Product p = new Product();
		p.setBrand(pr.getBrand());
		p.setDescription(pr.getDescription());
		p.setProductType(pr.getProductType());
		p.setPrice(pr.getPrice());
		p.setVisible(true);
		
		
		p.setProductName(pr.getProductName());
		p.setStock(pr.getStock());
		//p.setPicture(picture);
		
	
		return pRepo.save(p);
	}
	
// Supprimer produit dans la BDD
	@Override
	public Boolean delete(Long id) {
		// TODO : décommenter en dessous lorsque Samy aura merge vers test
		 Boolean produitDejaCommande = orderRepository.findById(id).isPresent();
		 //Boolean produitDejaCommande = false;
		if(!produitDejaCommande) {
			pRepo.deleteById(id);
			if(!pRepo.existsById(id)) {
				return true;
			}
			else {
				return false;
			}
		} else {
			throw new BadRequestException("Le produit que vous tentez de supprimer à été commandé.");
		}
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
    
    String sauveGardeImage(File image) {
    	//encodage en base 64 de l'image
    			//byte[] bytes = encoder(image.getPath());
    			
    			//p.setPicture(fileEncoded);
		return image.getPath();
    	
    }
    

public static String encoder(String imagePath) {
	String base64Image = "";
	File file = new File(imagePath);
	try (FileInputStream imageInFile = new FileInputStream(file)) {
		// Reading a Image file from file system
		byte imageData[] = new byte[(int) file.length()];
		imageInFile.read(imageData);
		base64Image = Base64.getEncoder().encodeToString(imageData);
	} catch (FileNotFoundException e) {
		System.out.println("Image not found" + e);
	} catch (IOException ioe) {
		System.out.println("Exception while reading the Image " + ioe);
	}
	return base64Image;
}


@Override
public String sauvegardeImage(MultipartFile image, String name) throws FileNotFoundException,IOException {
	//encodage en base 64 de l'image
	File f = new File("images/" + name);
	FileOutputStream fos = new FileOutputStream(f);
	fos.write(image.getBytes());
	
	return f.getPath();
}
}
