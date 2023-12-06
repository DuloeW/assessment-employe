package org.acme.controller;

import java.io.IOException;
import java.util.List;

import org.acme.entity.ImageEntity;
import org.acme.model.body.ImageBody;
import org.acme.service.ServiceImage;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.jaxrs.FormParam;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/image")
@RegisterRestClient
public class ImageController {
    
    @Inject
    ServiceImage serviceImage;

    @GET
    @Path("/get-all")
    public List<ImageEntity> getAllImage() {
        return serviceImage.getAllImage();
    }

    @POST
    @Transactional
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/create")
    public Response createImage(@MultipartForm ImageBody body) throws IOException {
        return serviceImage.createImage(body);
    }
}
