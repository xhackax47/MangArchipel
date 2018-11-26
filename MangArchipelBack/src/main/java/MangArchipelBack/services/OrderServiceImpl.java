package MangArchipelBack.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.exception.ResourceNotFoundException;
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

// Récuperer toutes les commandes
    @Override
    public Collection<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }
    
// Récuperer une commande par son ID    
	@Override
	public Order getOrderById(Long id) {
		return this.orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Produit", "id", id));
	}

// Enregistrer commande dans la BDD
    @Override
    public Order save(Order order) {
        order.setDateCreated(LocalDate.now());

        return this.orderRepository.save(order);
    }

// Mettre à jour commande dans la BDD
    @Override
    public Order update(Order order) {
        return this.orderRepository.save(order);
    }
    
// Supprimer commande dans la BDD
    @Override
    public void delete(Order order) {
        this.orderRepository.delete(order);
    }
    
}
