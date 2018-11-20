
package MangArchipelBack.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import MangArchipelBack.model.LoginRequest;
import MangArchipelBack.model.User;
import MangArchipelBack.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired 
	private UserService uService;

	@CrossOrigin(origins = "*")
	@PostMapping("/")
	public User createUser(@RequestBody User u) {
		return uService.save(u);
		
	}
	
//  Mettre à jour / Modifier un user
//  @Secured({"ROLE_USER"})
	@CrossOrigin(origins = "*")
	@PutMapping("/{id}") 
	public User updateUser(@PathVariable(value="id") Long id, @Valid @RequestBody User u) {
		User user = uService.getUserById(id);
		user.setAdress(u.getAdress());
		user.setCity(u.getCity());
		user.setFirstName(u.getFirstName());
		user.setLastName(u.getLastName());
		user.setPostalCode(u.getPostalCode());
		user.setUsername(u.getUsername());
		User uUpdate = uService.save(user);
		return uUpdate;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/user")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<User> getUser() {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} else {
			throw new AccessDeniedException("Vous devez être connecté pour accéder à cette ressource");
		}
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/login")
	// Connexion de compte utilisateur
	public User authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user;
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/logout")
	// Connexion de compte utilisateur
	public User logout(@Valid @RequestBody LoginRequest loginRequest) {
		SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
		return null;
	}
}
