package org.acme.model.body;

import java.time.LocalDate;

import org.acme.core.util.jackson.TimeDeserialize;
import org.acme.entity.EmployeeResignEntity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public record EmployeeResignBody(
    @JsonDeserialize(converter = TimeDeserialize.class)
    LocalDate resignDate,
    Long employee
) {
    
    public EmployeeResignEntity mapToEmployeeResign() {
        var resign = new EmployeeResignEntity();
        resign.resignDate = resignDate;
        return resign;
    }

}
