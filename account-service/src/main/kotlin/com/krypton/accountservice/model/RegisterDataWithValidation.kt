package com.krypton.accountservice.model

import com.krypton.accountservice.service.validator.RegistrationData
import com.krypton.accountservice.validator.RegistrationValidator.ValidationResult

data class RegisterDataWithValidation(
	val validation: ValidationResult,
	val registrationData: RegistrationData
)