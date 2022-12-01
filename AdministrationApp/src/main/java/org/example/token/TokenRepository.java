package org.example.token;

import org.example.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
@EnableJpaRepositories
public interface TokenRepository extends JpaRepository<Token, Long> {
    Token getByUser(User user);
}
