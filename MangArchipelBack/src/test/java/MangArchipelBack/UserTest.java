package MangArchipelBack;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

import java.util.HashSet;
import java.util.Set;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import MangArchipelBack.controller.UserController;
import MangArchipelBack.model.LoginRequest;
import MangArchipelBack.model.Role;
import MangArchipelBack.model.RoleName;
import MangArchipelBack.model.User;
import MangArchipelBack.repository.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UserTest {
	
	private User testUser;
	
	@Autowired
	private UserRepository uR;
	
	@Autowired
	private UserController uC;
	
	@Before
	public void init() {
		
		testUser = new User();
		Role r = new Role();
		Set<Role> roles = new HashSet<>();
		
		testUser.setUsername("ADMIN");
		testUser.setPassword("ADMIN");
		r.setId(1L);
		r.setName(RoleName.ROLE_ADMIN);
		roles.add(r);
		testUser.setRoles(roles);
		
		testUser = uR.save(testUser);
	}
	
	@After
	public void destroy() {
		uR.delete(testUser);
	}
	
	// TEST DE CREATION D'UTILISATEUR ET ENREGISTREMENT EN BDD
	@Test
	public void addUser() {
		
		assertNotNull(testUser);
		assertThat(uC.addUser(testUser));
	}
	
	// TEST AUTHENTIFICATION CONNEXION ET DECONNEXION
	@Test
	public void auth() {
		LoginRequest lR = new LoginRequest();
		lR.setUsername(testUser.getUsername());
		lR.setPassword(testUser.getPassword());
		
		assertThat(uC.authenticateUser(lR));
		assertThat(uC.logout(lR));
		
	}
	
}
