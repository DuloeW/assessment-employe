package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

import java.util.Objects;

import org.acme.entity.AdminEntity;
import org.acme.exception.response.ResponseMessage;
import org.acme.model.body.AdminBody;

@ApplicationScoped
public class ServiceAdmin {

    public AdminEntity getAdminById(Long id) {
        return AdminEntity
        .findAdminById(id)
        .orElseThrow(() -> ResponseMessage.idNotFoundException(id));
    }

    public Response createAdmin(AdminBody body) {
        Objects.requireNonNull(body);
        var admin = body.mapToAdmin();
        admin.persist();
        return Response.ok(admin).build();
    }

    public Response login(String email, String pass) {
        String emailString = email.toLowerCase();
        String pasString = pass.toLowerCase();
        boolean admin = AdminEntity.findAdminByEmailAndPass(emailString, pasString).isPresent();
        if(!admin) {
            return Response.status(401).build();
        }
        return Response.status(200).build();
    }
}

