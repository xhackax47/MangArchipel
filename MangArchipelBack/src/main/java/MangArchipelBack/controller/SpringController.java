package MangArchipelBack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import MangArchipelBack.model.User;

@RestController
@RequestMapping("/user")
public class SpringController {

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> getUser(){
    	if(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()
    		
    	
        ) {
    		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    		 return  new ResponseEntity<User>(user, HttpStatus.OK);
    	}else {
    		throw new AccessDeniedException("Vous devez être connecté pour accéder à cette ressource");
    	}
        
      
    }
}
