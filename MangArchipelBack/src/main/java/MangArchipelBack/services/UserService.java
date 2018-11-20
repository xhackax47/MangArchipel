package MangArchipelBack.services;


import MangArchipelBack.model.User;
import MangArchipelBack.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

       /* Objects.requireNonNull(username);
        Optional< User> user = userRepository.findUserWithName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        
        return user;
        */
    	
        Objects.requireNonNull(username);
        Optional< User> o = userRepository.findUserWithName(username);
        System.out.println("TOTO2");
        if(o.isPresent()) {
        	 return o.get();
        }else {
        	throw new UsernameNotFoundException("User not found");
        }
    }

}
