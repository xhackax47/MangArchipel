

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import MangArchipelBack.model.LoginRequest;
import MangArchipelBack.model.User;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
	AuthenticationManager authenticationManager;

  
	@CrossOrigin(origins = "*")
	@GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<User> getUser(){
    	if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
    		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    		 return  new ResponseEntity<User>(user, HttpStatus.OK);
    	}else {
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
