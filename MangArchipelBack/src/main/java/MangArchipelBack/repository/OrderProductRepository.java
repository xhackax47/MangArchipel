package MangArchipelBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import MangArchipelBack.model.OrderProduct;
import MangArchipelBack.model.OrderProductPK;

public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductPK> {
}
