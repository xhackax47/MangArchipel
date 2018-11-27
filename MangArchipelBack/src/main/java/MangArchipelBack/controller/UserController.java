package MangArchipelBack.controller;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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
import MangArchipelBack.model.Role;
import MangArchipelBack.model.User;
import MangArchipelBack.repository.RoleRepository;
import MangArchipelBack.services.RoleService;

import MangArchipelBack.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleService roleService;
	@Autowired
	private UserService userservice;
	
	@Autowired
	private RoleRepository roleRepository;

	@CrossOrigin(origins = "*")
	@GetMapping("/user")
	@PreAuthorize("hasRole('ROLE_USER')")
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
		Set<Role> roles = new HashSet<Role>();
		Role r = roleService.findRoleByUserId(user.getId()).get();
		roles.add(r);
		user.setRoles(roles);
		return user;
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/logout")
	// Connexion de compte utilisateur
	public User logout(@Valid @RequestBody LoginRequest loginRequest) {
		SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
		return null;
	}


	@CrossOrigin(origins = "*")
	@PostMapping("/signIn")
	// creation d'un utilisateur
	public User addUser(@RequestBody User user) {
		User userToSave=user;
		Set<Role> hr = new HashSet<>();
				hr.add(roleRepository.findById(2L).get());
		userToSave.setRoles(hr);
		return userservice.save(user);
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/{username}")
	public User loadUserByuserName(@PathVariable String username) {
		return (User) userservice.loadUserByUsername(username);
	}

	@CrossOrigin(origins = "*")
	@GetMapping("/{id}")
	public User loadUserByuserId(@PathVariable Long id) {
		return (User) userservice.getUserById(id);
	}

	@CrossOrigin(origins = "*")
	@PutMapping("/update/{id}")
	public User loadUser(@RequestBody User user, @PathVariable Long id) {
		System.out.println(user.toString());
		User u = userservice.getUserById(id);
		u.setAdress(user.getAdress());
		u.setCity(user.getCity());
		u.setFirstName(user.getFirstName());
		u.setLastName(user.getLastName());
		u.setEmail(user.getEmail());
		u.setUsername(user.getUsername());
		u.setPostalCode(user.getPostalCode());
		u.setPassword(user.getPassword());
		User userUpdate = userservice.save(u);
		return userUpdate;
	}
	

}
