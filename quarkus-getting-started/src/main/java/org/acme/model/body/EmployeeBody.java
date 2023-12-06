package org.acme.model.body;

import java.time.LocalDate;

import org.acme.core.util.jackson.TimeDeserialize;
import org.acme.entity.EmployeeEntity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.json.bind.annotation.JsonbDateFormat;

public record EmployeeBody(
    String name,
    String position,
    String address,
    String phone,
    String placeBirth,
        @JsonDeserialize(converter = TimeDeserialize.class)
        @JsonbDateFormat("dd-MM-yyyy")
    LocalDate birth,
    String ktp,
    String gender,
    String married,
    String image,
    String status
) {
    
    public EmployeeEntity mapToEmloyee() {
        var employee = new EmployeeEntity();
        employee.name = name;
        employee.position = position;
        employee.address = address;
        employee.phone = phone;
        employee.placeBirth = placeBirth;
        employee.birth = birth;
        employee.ktp = ktp;
        employee.gender = gender;
        employee.married = married;
        employee.image = image;
        employee.status = status;
        return employee;
    }
}
