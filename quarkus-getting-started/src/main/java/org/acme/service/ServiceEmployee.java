package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.acme.entity.EmployeeEntity;
import org.acme.exception.response.ResponseMessage;
import org.acme.model.body.EmployeeBody;

@ApplicationScoped
public class ServiceEmployee {

    private boolean checkingEmployeeIsExistById(Long id) {
        return EmployeeEntity.findEmployeeById(id).isPresent();
    }

    public EmployeeEntity getEmployeeById(Long id) {
        return EmployeeEntity
        .findEmployeeById(id)
        .orElseThrow(() -> ResponseMessage.idNotFoundException(id));
    }

    public List<EmployeeEntity> getEmployeeByName(String name) {
        return EmployeeEntity.findEmployeeByName(name.toLowerCase())
        .stream()
        .collect(Collectors.toList());
    }

    public List<EmployeeEntity> getAllEmployee() {
        return EmployeeEntity.findAllEmployee()
        .stream()
        .collect(Collectors.toList());
    }

    public List<EmployeeEntity> getAllEmployeeStatus(String status) {
        return EmployeeEntity.findEmployeeByStatus(status)
        .stream()
        .collect(Collectors.toList());
    }

    public Response createEmployee(EmployeeBody body) {
        Objects.requireNonNull(body);
        var employee = body.mapToEmloyee();
        employee.persist();
        return Response.ok().entity(employee).build();
    }

    public Response updateEmployee(EmployeeEntity entity) {
        var employee = getEmployeeById(entity.id);
        entity.updatEmployeeEntity(employee);
        return Response.ok().entity(employee).build();
    }

    public Response updateStatus(EmployeeEntity entity) {
        var employee = getEmployeeById(entity.id);
        entity.updateStatus(employee);
        return Response.ok().entity(employee).build();
    }

    public Response deleteEmployee(Long id) {
        if(!checkingEmployeeIsExistById(id)) {
            return ResponseMessage.idNotFound(id);
        }
        EmployeeEntity.deleteById(id);
        return ResponseMessage.deleteSucces(id);
    }

}
