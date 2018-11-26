package MangArchipelBack.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import MangArchipelBack.model.Role;
import MangArchipelBack.repository.RoleRepository;

@Service
public class RoleService {
	@Autowired
	RoleRepository roleRepository;
	
	public Optional<Role> findRoleByUserId(long id) {
		return roleRepository.findRoleByUserId(id);
	}
}
