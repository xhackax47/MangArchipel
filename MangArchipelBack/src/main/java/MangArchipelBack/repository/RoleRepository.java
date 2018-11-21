package MangArchipelBack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import MangArchipelBack.model.Role;
import java.util.Optional;

@Repository
@Transactional
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(" select r from Role r join r.users ur on ur.id = r.id " +
            " where ur.id = ?1")
    Optional<Role> findRoleByUserId(Long id);

}
