package MangArchipelBack.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.model.Order;
import MangArchipelBack.repository.OrderRepository;

import java.time.LocalDate;
import java.util.Collection;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Collection<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }

    @Override
    public Order create(Order order) {
        order.setDateCreated(LocalDate.now());

        return this.orderRepository.save(order);
    }

    @Override
    public void update(Order order) {
        this.orderRepository.save(order);
    }

}
