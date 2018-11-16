package MangArchipelBack.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MANGARCHIPEL_PRODUCT")
public class Product {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="NAME")
	private String productName;
	
	@Column(name="BRAND")
	private String brand;
	
	@Column(name="PRICE")
	private Double price;
	
	@Column(name="TYPE")
	private String productType;
	
	public Product() {}

	public Product(Long id, String productName, String brand, Double price, String productType) {
		super();
		this.id = id;
		this.productName = productName;
		this.brand = brand;
		this.price = price;
		this.productType = productType;
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
	
}
