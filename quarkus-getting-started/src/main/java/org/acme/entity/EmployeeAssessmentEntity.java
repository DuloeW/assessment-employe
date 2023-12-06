package org.acme.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.UpdateTimestamp;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.smallrye.common.constraint.NotNull;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import static org.acme.core.util.ManipulateUtil.changeItOrNot;


@Entity
@Table(name = "employee_assessment")
public class EmployeeAssessmentEntity extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(generator = "bayu_id_gen")
    @Column
    @NotNull
    public Long id;

    @UpdateTimestamp
    @Column(name = "latest_assessment")
    public LocalDate latestAssessment;

    @Column(name = "ratings")
    public Double ratings;

    @OneToOne
    @JsonbTransient
    @JoinColumn(name = "employee")
    public EmployeeEntity employee;
    

    public static Optional<EmployeeAssessmentEntity> findEmployeeAssessmentById(Long id) {
        return find("id =? 1", id).firstResultOptional();
    }

    public static List<EmployeeAssessmentEntity> findAllEmployeeAssessment() {
        return EmployeeAssessmentEntity.listAll();
    }

    public EmployeeAssessmentEntity updateEmployeeAssessment(EmployeeAssessmentEntity assessment) {
        assessment.latestAssessment = changeItOrNot(latestAssessment, assessment.latestAssessment);
        assessment.ratings = changeItOrNot(ratings, assessment.ratings);
        return assessment;
    }
}
