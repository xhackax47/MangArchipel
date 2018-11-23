package MangArchipelBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import MangArchipelBack.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}
