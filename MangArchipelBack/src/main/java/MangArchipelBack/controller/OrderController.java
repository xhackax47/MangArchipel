package MangArchipelBack.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import MangArchipelBack.dto.OrderProductDto;
import MangArchipelBack.exception.ResourceNotFoundException;
import MangArchipelBack.model.Order;
import MangArchipelBack.model.OrderProduct;
import MangArchipelBack.model.OrderStatus;
import MangArchipelBack.services.OrderProductService;
import MangArchipelBack.services.OrderService;
import MangArchipelBack.services.ProductService;
import MangArchipelBack.services.UserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
    ProductService productService;
	@Autowired
    OrderService orderService;
	@Autowired
	OrderProductService orderProductService;
	@Autowired
	UserService userService;

    public OrderController(ProductService productService, OrderService orderService, OrderProductService orderProductService) {
        this.productService = productService;
        this.orderService = orderService;
        this.orderProductService = orderProductService;
    }

// Récupérer toutes les commandes
	@CrossOrigin(origins = "*")
    @GetMapping("/")
    public Collection<Order> getAll() {
        return this.orderService.getAllOrders();
    }
    
// Récupérer une commande par son ID
	@CrossOrigin(origins = "*")
    @GetMapping("/{id}")
	public Order getOrder(@PathVariable(value="id") Long id) {
		return this.orderService.getOrderById(id);
	}

// Créer une commande
	@CrossOrigin(origins = "*")
    @PostMapping("/{userId}")
    public ResponseEntity<Order> create(@RequestBody OrderForm form, @PathVariable Long userId) {
        List<OrderProductDto> formDtos = form.getProductOrders();
        validateProductsExistence(formDtos);
        Order order = new Order();
        order.setUser(userService.getUserById(userId));
        order.setStatus(OrderStatus.PAID.name());
        order = this.orderService.save(order);

        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductDto dto : formDtos) {
            orderProducts.add(orderProductService.create(
            		new OrderProduct(order, productService.getProduct(dto.getProduct().getId()), dto.getQuantity())));
        }

        order.setOrderProducts(orderProducts);

        this.orderService.update(order);

        String uri = ServletUriComponentsBuilder
          .fromCurrentServletMapping()
          .path("/orders/{id}")
          .buildAndExpand(order.getId())
          .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }

// Valider l'existence d'un produit avant commande
	@CrossOrigin(origins = "*")
    private void validateProductsExistence(List<OrderProductDto> orderProducts) {
        List<OrderProductDto> list = orderProducts
          .stream()
          .filter(op -> Objects.isNull(productService.getProduct(op
            .getProduct()
            .getId())))
          .collect(Collectors.toList());

        if (!CollectionUtils.isEmpty(list)) {
            new ResourceNotFoundException("Produits", "orderProducts", orderProducts);
        }
    }

    public static class OrderForm {

        private List<OrderProductDto> productOrders;

        public List<OrderProductDto> getProductOrders() {
            return productOrders;
        }

        public void setProductOrders(List<OrderProductDto> productOrders) {
            this.productOrders = productOrders;
        }
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping("/ByUserId/{id}")
    @ResponseBody
    private List<Order> getByUserId(@PathVariable(value="id") Long id){
		return orderService.getOrderByUserId(id);
    	
    }
}
