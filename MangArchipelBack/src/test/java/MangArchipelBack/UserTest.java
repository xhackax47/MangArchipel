package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.UserController;
import MangArchipelBack.model.LoginRequest;
import MangArchipelBack.model.User;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UserTest {
	
	@Autowired
	private UserController uC;
	
	// TEST DE CREATION D'UTILISATEUR ET ENREGISTREMENT EN BDD
	@Test
	public void addUser() {
		User u = new User();
		u.setId(1000L);
		u.setUsername("TEST");
		
		assertNotNull(u);
		assertThat(uC.addUser(u));
	}
	
	// TEST AUTHENTIFICATION CONNEXION ET DECONNEXION
	@Test
	public void auth() {
		User u = new User();
		u.setId(1000L);
		u.setUsername("ADMIN");
		u.setPassword("ADMIN");
		
		LoginRequest lR = new LoginRequest();
		lR.setUsername(u.getUsername());
		lR.setPassword(u.getPassword());
		
		assertThat(uC.authenticateUser(lR));
		assertThat(uC.logout(lR));
		
	}
	
}
