package MangArchipelBack.services;


import MangArchipelBack.model.User;
import MangArchipelBack.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    
// Enregistrer user dans la BDD
 	public User save(User u) {
 		return userRepository.save(u);
 	}

// Trouver user dans la BDD	via son ID
 	public User getUserById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));	
 	}
 	
 	

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	
        Objects.requireNonNull(username);
        Optional< User> o = userRepository.findUserWithName(username);
        if(o.isPresent()) {
        	 return o.get();
        }else {
        	throw new UsernameNotFoundException("Utilisateur non trouvé");
        }
    }

}
