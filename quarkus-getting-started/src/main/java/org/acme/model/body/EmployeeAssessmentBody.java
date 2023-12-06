package org.acme.model.body;

import java.time.LocalDate;

import org.acme.core.util.jackson.TimeDeserialize;
import org.acme.entity.EmployeeAssessmentEntity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public record EmployeeAssessmentBody(
    @JsonDeserialize(converter = TimeDeserialize.class)
    LocalDate latestAssessment,
    Double ratings,
    Long employee
) {
    
    public EmployeeAssessmentEntity mapToEmployeeAssessment() {
        var assessment = new EmployeeAssessmentEntity();
        assessment.latestAssessment = latestAssessment;
        assessment.ratings = ratings;
        return assessment;
    }
}
