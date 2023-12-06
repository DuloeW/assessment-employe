package org.acme.core.util.jackson;

import com.fasterxml.jackson.databind.util.StdConverter;
import java.time.LocalDateTime;
import org.acme.core.util.FormatUtil;

public class TimeSerialize extends StdConverter<LocalDateTime, String> {

  @Override
  public String convert(LocalDateTime time) {
    return FormatUtil.convertToString(time);
  }
}
