package org.acme.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.acme.entity.EmployeeAssessmentEntity;
import org.acme.entity.EmployeeEntity;
import org.acme.exception.response.ResponseMessage;
import org.acme.model.body.EmployeeAssessmentBody;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class ServiceEmployeeAssesment {

    private boolean checkingIsEmployeeAssessmentExist(Long id) {
        return EmployeeAssessmentEntity.findById(id).isPersistent();
    }
    
    public EmployeeAssessmentEntity getEmployeeAssessmentEntityById(Long id) {
        return EmployeeAssessmentEntity.findEmployeeAssessmentById(id)
        .orElseThrow(() -> ResponseMessage.idNotFoundException(id));
    }

    public List<EmployeeAssessmentEntity> getAllEmployeeAssessmentEntity() {
        return EmployeeAssessmentEntity.findAllEmployeeAssessment()
        .stream()
        .collect(Collectors.toList());
    }

    private EmployeeEntity fetchEmployee(Long id) {
        return EmployeeEntity.findEmployeeById(id)
        .orElseThrow(() -> ResponseMessage.fetchMessageException(id, "employee"));
    }

    private Response createRelasi(EmployeeAssessmentBody body, EmployeeEntity employee) {
        var assessment = body.mapToEmployeeAssessment();
        assessment.employee = employee;
        assessment.persist();
        return Response.ok(assessment).build();
    }

    public Response createEmployeeAssessment(EmployeeAssessmentBody body) {
        Objects.requireNonNull(body);
        var employee = fetchEmployee(body.employee());
        return createRelasi(body, employee);
    }

    public Response updateEmployeeAssessment(EmployeeAssessmentEntity entity) {
        var assessment = getEmployeeAssessmentEntityById(entity.id);
        entity.updateEmployeeAssessment(assessment);
        return Response.ok(assessment).build();
    }

    public Response deleteEmployeeAssessment(Long id) {
        if(!checkingIsEmployeeAssessmentExist(id)) {
            return ResponseMessage.idNotFound(id);
        }
        EmployeeAssessmentEntity.deleteById(id);
        return ResponseMessage.deleteSucces(id);
    }

    
}
