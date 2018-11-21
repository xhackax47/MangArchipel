package MangArchipelBack.services;

import java.util.Optional;

import MangArchipelBack.model.Role;
import MangArchipelBack.repository.RoleRepository;

public class RoleService {
	RoleRepository roleRepository;
	public Optional<Role> findRoleByUserId(long id) {
		return roleRepository.findRoleByUserId(id);
	}
}
