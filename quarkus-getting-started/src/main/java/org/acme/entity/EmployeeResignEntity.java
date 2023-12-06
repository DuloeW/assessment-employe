package org.acme.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.UpdateTimestamp;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
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
@Table(name = "employee_resign")
public class EmployeeResignEntity extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(generator = "bayu_id_gen")
    public Long id;

    @UpdateTimestamp
    @Column(name = "resign_date")
    public LocalDate resignDate;

    @OneToOne
    @JsonbTransient
    @JoinColumn(name = "employee")
    public EmployeeEntity employee;

    public static Optional<EmployeeResignEntity> findEmployeeResignById(Long id) {
        return find("id =? 1", id).firstResultOptional();
    }

    public static List<EmployeeResignEntity> findAllEmployeeResign() {
        return EmployeeResignEntity.listAll();
    }

    public EmployeeResignEntity updateEmployeeResign(EmployeeResignEntity resign) {
        resign.resignDate = changeItOrNot(resignDate, resign.resignDate);
        return resign;
    }
}
