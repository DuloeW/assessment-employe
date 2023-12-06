package org.acme.controller;

import org.acme.entity.AdminEntity;
import org.acme.model.body.AdminBody;
import org.acme.service.ServiceAdmin;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/admin")
public class AdminController {
    
    @Inject
    ServiceAdmin serviceAdmin;

    @GET
    @Path("/get/{id}")
    public AdminEntity getAdminById(@PathParam("id") Long id) {
        return serviceAdmin.getAdminById(id);
    }

    @POST
    @Path("/create")
    @Transactional
    public Response createAdmin(AdminBody body) {
        return serviceAdmin.createAdmin(body);
    }

    @POST
    @Path("/login/{email}/{password}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@PathParam("email") String email, @PathParam("password") String password) {
        return serviceAdmin.login(email, password);
    }
}
