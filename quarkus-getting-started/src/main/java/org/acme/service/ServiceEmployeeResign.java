package org.acme.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.acme.entity.EmployeeEntity;
import org.acme.entity.EmployeeResignEntity;
import org.acme.exception.response.ResponseMessage;
import org.acme.model.body.EmployeeResignBody;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class ServiceEmployeeResign {
    
    public EmployeeResignEntity getEmployeeResignById(Long id) {
        return EmployeeResignEntity.findEmployeeResignById(id)
        .orElseThrow(() -> ResponseMessage.idNotFoundException(id));
    }

    public List<EmployeeResignEntity> getAllEmployeeResign() {
        return EmployeeResignEntity.findAllEmployeeResign()
        .stream()
        .collect(Collectors.toList());
    }

    private EmployeeEntity fetchEmployeeEntity(Long id) {
        return EmployeeEntity.findEmployeeById(id)
        .orElseThrow(() -> ResponseMessage.fetchMessageException(id, "employee"));
    }

    private Response createRelasi(EmployeeResignBody body, EmployeeEntity employe) {
        var resign = body.mapToEmployeeResign();
        resign.employee = employe;
        resign.persist();
        return Response.ok(resign).build();
    }

    public Response createEmployeeResign(EmployeeResignBody body) {
        Objects.requireNonNull(body);
        var employee = fetchEmployeeEntity(body.employee());
        return createRelasi(body, employee);
    }
}
