package org.acme.entity;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "images")
public class ImageEntity extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(generator = "bayu_id_gen")
    @Column(name = "id")
    public Long id;

    @Column(name = "file_name")
    public String fileName;

    @Lob
    @Column(name = "file_content", columnDefinition = "blob", length = 1048576)
    public byte[] fileContent;

    public static List<ImageEntity> findAllImage() {
        return ImageEntity.listAll();
    }
}
