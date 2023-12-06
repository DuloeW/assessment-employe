package org.acme.model.body;

import org.acme.entity.ImageEntity;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public record ImageBody(
        @FormParam("file")
        @PartType(MediaType.APPLICATION_OCTET_STREAM)
        InputStream file

        // @FormParam("fileName")
        // @PartType(MediaType.TEXT_PLAIN)
        // String fileName
) {

    public ImageEntity mapToImage() throws IOException {
    var image = new ImageEntity();
    
    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    int nRead;
    byte[] data = new byte[16384];
    while ((nRead = file.read(data, 0, data.length)) != -1) {
        buffer.write(data, 0, nRead);
    }
    buffer.flush();
    
    image.fileContent = buffer.toByteArray();
    
    image.fileName = file.getClass().getSimpleName();
    image.persist();
    return image;
}

}
