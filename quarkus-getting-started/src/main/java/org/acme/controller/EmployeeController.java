package org.acme.controller;

import java.util.List;

import org.acme.entity.EmployeeEntity;
import org.acme.model.body.EmployeeBody;
import org.acme.service.ServiceEmployee;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/employee")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeController {
    
    @Inject
    ServiceEmployee serviceEmployee;

    @GET
    @Path("/get-all")
    public List<EmployeeEntity> getAllEmploye() {
        return serviceEmployee.getAllEmployee();
    }

    @GET
    @Path("/get/name/{name}")
    public List<EmployeeEntity> getEmployeeByName(@PathParam("name") String name) {
        return serviceEmployee.getEmployeeByName(name);
    } 

    //TODO error
    @GET
    @Path("/get/status/{status}")
    public List<EmployeeEntity> getAllEmployeeStatus(@PathParam("status") String status) {
        return serviceEmployee.getAllEmployeeStatus(status);
    }

    @GET
    @Path("/get/{id}")
    public EmployeeEntity getEmployeeById(@PathParam("id") Long id) {
        return serviceEmployee.getEmployeeById(id);
    }

    @POST
    @Transactional
    @Path("/create")
    public Response createEmployee(EmployeeBody body) {
        return serviceEmployee.createEmployee(body);
    }

    @PUT
    @Transactional
    @Path("/update")
    public Response updateEmployee(EmployeeEntity entity) {
        return serviceEmployee.updateEmployee(entity);
    }

    @PUT
    @Transactional
    @Path("/update/status")
    public Response updateStatus(EmployeeEntity entity) {
        return serviceEmployee.updateStatus(entity);
    }

    @DELETE
    @Transactional
    @Path("/delete/{id}")
    public Response deleteEmployee(@PathParam("id") Long id) {
        return serviceEmployee.deleteEmployee(id);
    }
}
