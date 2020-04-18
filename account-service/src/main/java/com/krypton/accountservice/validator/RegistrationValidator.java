package com.krypton.accountservice.validator;

import com.krypton.accountservice.service.validator.RegistrationData;

import static com.krypton.accountservice.validator.RegistrationValidator.ValidationResult;
import static com.krypton.accountservice.validator.RegistrationValidator.ValidationResult.*;
import java.util.function.Function;

public interface RegistrationValidator extends Function<RegistrationData, ValidationResult>
{
  static RegistrationValidator nickValid()
  {
    return registrationData -> registrationData.getName().length() > 4 ? SUCCESS : NICK_IS_TOO_SHORT;
  }

  static RegistrationValidator emailValid()
  {
    return registrationData ->
    {
      var email = registrationData.getEmail();

      return email.contains("@") && email.length() > 5
              ? SUCCESS
              : EMAIL_IS_NOT_VALID;
    };
  }

  static RegistrationValidator passwordValid()
  {
    return registrationData -> registrationData.getPassword().length() > 3 ? SUCCESS : PASSWORD_IS_TOO_SHORT;
  }

  default RegistrationValidator and(RegistrationValidator other)
  {
    return registrationData ->
    {
      var result = this.apply(registrationData);

      return result.equals(SUCCESS) ? other.apply(registrationData) : result;
    };
  }

  enum ValidationResult
  {
    SUCCESS("success"),
    NICK_IS_TOO_SHORT("nick is too short"),
    EMAIL_IS_NOT_VALID("email is not valid"),
    PASSWORD_IS_TOO_SHORT("password too short");

    public final String value;

    ValidationResult(String value)
    {
      this.value = value;
    }
  }
}
