package org.acme.service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.acme.entity.ImageEntity;
import org.acme.model.body.ImageBody;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@RegisterRestClient
public class ServiceImage {

    public List<ImageEntity> getAllImage() {
        return ImageEntity.findAllImage()
        .stream()
        .collect(Collectors.toList());
    }

    public Response createImage(ImageBody body) throws IOException {
        Objects.requireNonNull(body);
        var image = body.mapToImage();
        System.out.println("Image : " + image );
        return Response.ok(image).build();
    }

}