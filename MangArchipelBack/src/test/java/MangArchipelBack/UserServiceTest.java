package MangArchipelBack;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.UserController;
import MangArchipelBack.model.User;
import MangArchipelBack.services.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UserServiceTest {
	
	@Autowired
	private UserService uS;
	
	@Autowired
	private UserController uC;
	
	@Test
	public void addUser() {
		User u = new User();
		u.setUsername("TEST");
		
		User uTest = uC.addUser(u);
		assertEquals(uTest, u);
	}
	
}
