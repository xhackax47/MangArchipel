package MangArchipelBack.services;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.Order;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderService {

    @NotNull Iterable<Order> getAllOrders();

    Order create(@NotNull(message = "La commande ne peut pas être nulle.") @Valid Order order);

    void update(@NotNull(message = "La commande ne peut pas être nulle.") @Valid Order order);
}
