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

    @Query(" select r from Role r inner join user_roles ur on ur.role_id = r.role_id " +
            " where ur.userid = ?1")
    Optional<Role> findRoleByUserId(Long id);

}
