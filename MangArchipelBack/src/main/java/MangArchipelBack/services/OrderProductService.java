package MangArchipelBack.services;

import org.springframework.validation.annotation.Validated;

import MangArchipelBack.model.OrderProduct;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderProductService {

    OrderProduct create(@NotNull(message = "Les produits de la commande ne peuvent être nuls") @Valid OrderProduct orderProduct);
}
