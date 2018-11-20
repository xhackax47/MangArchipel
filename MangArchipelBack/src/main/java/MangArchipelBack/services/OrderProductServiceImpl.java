package MangArchipelBack.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.model.OrderProduct;
import MangArchipelBack.repository.OrderProductRepository;

@Service
@Transactional
public class OrderProductServiceImpl implements OrderProductService {

    private OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    public OrderProduct create(OrderProduct orderProduct) {
        return this.orderProductRepository.save(orderProduct);
    }

}
