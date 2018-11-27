package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
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
import MangArchipelBack.repository.OrderRepository;
import MangArchipelBack.services.OrderService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class OrderTest {
	
	private Order testOrder;
	
	@Autowired
	private OrderRepository oR;
	
	@Autowired
	private OrderService oS;
	
	@Before
	public void init() {
		List<OrderProductDto> listDTO = new ArrayList<>();
		List<OrderProduct> listP = new ArrayList<>();
        Product pDTO = new Product();
        OrderProduct oP = new OrderProduct();
        testOrder = new Order();
        OrderForm form = new OrderForm();       
        OrderProductDto opd = new OrderProductDto();
        
        opd.setProduct(pDTO);
        opd.setQuantity(10);   
        listP.add(oP);
        listDTO.add(opd);    
        form.setProductOrders(listDTO);
        testOrder.setOrderProducts(listP);
        testOrder.setId(1000L);
        testOrder.setDateCreated(LocalDate.now());
        testOrder.setStatus(OrderStatus.PAID.name());
        
        testOrder = oR.save(testOrder);
        
	}
	
	@After
	public void destroy() {
		oR.delete(testOrder);
	}
	
	@Test
	public void orders() {

        assertThat(oS.update(testOrder));
        assertThat(oS.save(testOrder));
        
	}

}
