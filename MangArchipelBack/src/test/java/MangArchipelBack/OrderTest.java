package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.OrderController.OrderForm;
import MangArchipelBack.dto.OrderProductDto;
import MangArchipelBack.model.Order;
import MangArchipelBack.model.OrderProduct;
import MangArchipelBack.model.OrderStatus;
import MangArchipelBack.model.Product;
import MangArchipelBack.services.OrderService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class OrderTest {
	
	
	@Autowired
	private OrderService oS;
	
	@Test
	public void orders() {
		List<OrderProductDto> listDTO = new ArrayList<>();
		List<OrderProduct> listP = new ArrayList<>();

        Product pDTO = new Product();
        OrderProduct oP = new OrderProduct();
        Order order = new Order();
        OrderForm form = new OrderForm();
        
        OrderProductDto opd = new OrderProductDto();
        opd.setProduct(pDTO);
        opd.setQuantity(10);
        
        listP.add(oP);
        listDTO.add(opd);
        
        form.setProductOrders(listDTO);
        order.setOrderProducts(listP);
        order.setId(1000L);
        order.setDateCreated(LocalDate.now());
        order.setStatus(OrderStatus.PAID.name());
        
        assertThat(oS.update(order));
        assertThat(oS.save(order));
        
	}

}
