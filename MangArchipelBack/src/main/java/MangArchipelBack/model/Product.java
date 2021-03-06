package MangArchipelBack.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "MANGARCHIPEL_PRODUCT")
public class Product {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message = "Le nom du produit est requis.")
	@Column(name="NAME")
	private String productName;
	
	@NotNull(message = "La marque du produit est requise.")
	@Column(name="BRAND")
	private String brand;
	
	@NotNull(message = "Le prix du produit est requis.")
	@Column(name="PRICE")
	private Double price;
	
	@NotNull(message = "Le type du produit est requis.")
	@Column(name="TYPE")
	private String productType;
	
	@NotNull(message = "Le stock du produit est requis.")
	@Column(name="STOCK")
	private Integer stock;
	
	@Column(name="DESCRIPTION",length=2000)
	private String description;
	

	@Column(name="PICTURE")
	private String picture;

	@Column(name="VISIBLE")
	private boolean visible;
	
	
	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public Product() {}

	public Product(Long id, String productName, String brand, Double price, String productType, Integer stock, String description, String picture) {
		super();
		this.id = id;
		this.productName = productName;
		this.brand = brand;
		this.price = price;
		this.productType = productType;
		this.stock = stock;
		this.description = description;
		this.picture = picture;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	/**
	 * @return the descriptitf
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param descriptitf the descriptitf to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the picture
	 */
	public String getPicture() {
		return picture;
	}

	/**
	 * @param picture the picture to set
	 */
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
}
