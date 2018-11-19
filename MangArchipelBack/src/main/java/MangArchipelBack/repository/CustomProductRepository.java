package MangArchipelBack.repository;

import java.util.List;

import MangArchipelBack.model.Product;

public interface CustomProductRepository {
	public List<Product> searchProduct(String productName, String brand, Double price, String productType, Integer stock);
}
