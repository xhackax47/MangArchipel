package MangArchipelBack.services;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.Order;

import java.util.Collection;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderService {

    Collection<Order> getAllOrders();
    Order getOrderById(Long id);
    Order save(@NotNull(message = "La commande ne peut pas être nulle.") @Valid Order order);
    Order update(@NotNull(message = "La commande ne peut pas être nulle.") @Valid Order order);
    void delete(Order order);
    
}
