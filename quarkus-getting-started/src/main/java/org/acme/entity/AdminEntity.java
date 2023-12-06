package org.acme.entity;

import java.time.LocalDate;
import java.util.Optional;

import org.hibernate.annotations.CreationTimestamp;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.smallrye.common.constraint.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class AdminEntity extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(generator = "bayu_id_gen")
    @Column
    @NotNull
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "nick_name")
    public String nickName;

    @Column(name = "place_birth")
    public String placeBirth;

    @CreationTimestamp
    @Column(name = "birth")
    public LocalDate birth;

    @Column(name = "email")
    public String email;

    @Column(name =  "password")
    public String password;

    public static Optional<AdminEntity> findAdminById(Long id) {
        return find("id =? 1", id).firstResultOptional();
    }

    public static Optional<AdminEntity> findAdminByEmailAndPass(String email, String pass) {
        return find("email =? 1 AND password =? 2", email, pass).firstResultOptional();
    }
}
