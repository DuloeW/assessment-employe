package org.acme.controller;

import java.util.List;

import org.acme.entity.EmployeeAssessmentEntity;
import org.acme.model.body.EmployeeAssessmentBody;
import org.acme.service.ServiceEmployeeAssesment;

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

@Path("/api/employee-assessment")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeAssessmentController {
    
    @Inject
    ServiceEmployeeAssesment serviceEmployeeAssesment;

    @GET
    @Path("/get-all")
    public List<EmployeeAssessmentEntity> getAllEmployeeAssessment() {
        return serviceEmployeeAssesment.getAllEmployeeAssessmentEntity();
    }

    @POST
    @Transactional
    @Path("/create")
    public Response createEmployeeAssessment(EmployeeAssessmentBody body) {
        return serviceEmployeeAssesment.createEmployeeAssessment(body);
    }

    @PUT
    @Transactional
    @Path("/update")
    public Response updateEmployeeAssessment(EmployeeAssessmentEntity assessment) {
        return serviceEmployeeAssesment.updateEmployeeAssessment(assessment);
    }

    @DELETE
    @Transactional
    @Path("/delete/{id}")
    public Response deleteEmployeeAssessmentById(@PathParam("id") Long id) {
        return serviceEmployeeAssesment.deleteEmployeeAssessment(id);
    }
}
