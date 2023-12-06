package org.acme.model.body;

import java.time.LocalDate;

import org.acme.core.util.jackson.TimeDeserialize;
import org.acme.entity.AdminEntity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public record AdminBody(
    String name,
    String nickName,
    String placeBirth,
    @JsonDeserialize(converter = TimeDeserialize.class)
    LocalDate birth,
    String email,
    String password
) {
    
    public AdminEntity mapToAdmin() {
        var admin = new AdminEntity();
        admin.name = name;
        admin.nickName = nickName;
        admin.placeBirth = placeBirth;
        admin.birth = birth;
        admin.email = email;
        admin.password = password;

        return admin;
    }
}
