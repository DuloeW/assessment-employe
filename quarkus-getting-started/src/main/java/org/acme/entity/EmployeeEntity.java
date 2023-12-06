package org.acme.entity;

import java.time.LocalDate;
import java.util.Optional;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.smallrye.common.constraint.NotNull;
import jakarta.json.bind.annotation.JsonbDateFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import static org.acme.core.util.ManipulateUtil.changeItOrNot;

@Entity
@Table(name = "employee")
public class EmployeeEntity extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(generator = "bayu_id_gen")
    @Column(name = "id")
    @NotNull
    public Long id;

    @Column(name = "name")
    @NotNull
    public String name;

    @Column(name = "position", columnDefinition = "enum")
    @NotNull
    public String position;

    @Column(name = "address")
    @NotNull
    public String address;

    @Column(name = "phone")
    @NotNull
    public String phone;

    @Column(name = "place_birth")
    @NotNull
    public String placeBirth;

    @JsonFormat(pattern = "d-MM-yyyy")
    @JsonbDateFormat("dd-MM-yyyy")
    @CreationTimestamp
    @Column(name = "birth")
    @NotNull
    public LocalDate birth;

    @Column(name = "ktp")
    @NotNull
    public String ktp;

    @Column(name = "gender", columnDefinition = "enum")
    @NotNull
    public String gender;

    @Column(name = "married", columnDefinition = "enum")
    @NotNull
    public String married;

    @Column(name = "image")
    @NotNull
    public String image;

    @Column(name = "status", columnDefinition = "enum")
    @NotNull
    public String status;

    @OneToOne(mappedBy = "employee")
    public EmployeeAssessmentEntity assessment;

    @OneToOne(mappedBy = "employee")
    public EmployeeResignEntity resign;

    public static Optional<EmployeeEntity> findEmployeeById(Long id) {
        return find("id =? 1", id).firstResultOptional();
    }

    public static List<EmployeeEntity> findEmployeeByName(String name) {
        return find("name LIKE ?1 AND status = 'active'", "%" + name + "%").list();
    }

    public static List<EmployeeEntity> findEmployeeByStatus(String status) {
        return find("status", status).list();
    }

    public static List<EmployeeEntity> findAllEmployee() {
        return EmployeeEntity.listAll();
    }

    public EmployeeEntity updateStatus(EmployeeEntity employee) {
        employee.status = changeItOrNot(status, employee.status);
        return employee;
    }

    public EmployeeEntity updatEmployeeEntity(EmployeeEntity employee) {
        employee.name = changeItOrNot(name, employee.name);
        employee.position = changeItOrNot(position, employee.position);
        employee.address = changeItOrNot(address, employee.address);
        employee.phone = changeItOrNot(phone, employee.phone);
        employee.placeBirth = changeItOrNot(placeBirth, employee.placeBirth);
        employee.birth = changeItOrNot(birth, employee.birth);
        employee.ktp = changeItOrNot(ktp, employee.ktp);
        employee.gender = changeItOrNot(gender, employee.gender);
        employee.married = changeItOrNot(married, employee.married);
        employee.image = changeItOrNot(image, employee.image);
        // employee.status = changeItOrNot(status, employee.status);
        return employee;
    }
}
