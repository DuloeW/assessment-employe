package org.acme.controller;

import java.util.List;

import org.acme.entity.EmployeeResignEntity;
import org.acme.model.body.EmployeeResignBody;
import org.acme.service.ServiceEmployeeResign;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/employee-resign")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeResignController {
    
    @Inject
    ServiceEmployeeResign serviceEmployeeResign;


    @GET
    @Path("/get/{id}")
    public EmployeeResignEntity getEmployeeResignById(@PathParam("id") Long id) {
        return serviceEmployeeResign.getEmployeeResignById(id);
    }

    @GET
    @Path("/get-all")
    public List<EmployeeResignEntity> getAllEmployeeResign() {
        return serviceEmployeeResign.getAllEmployeeResign();
    }

    @POST
    @Transactional
    @Path("/create")
    public Response createEmployeeResign(EmployeeResignBody body) {
        return serviceEmployeeResign.createEmployeeResign(body);
    }
}
