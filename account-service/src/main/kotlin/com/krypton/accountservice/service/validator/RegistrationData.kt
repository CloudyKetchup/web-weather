package com.krypton.accountservice.service.validator

data class RegistrationData(
	val name    : String,
	val email   : String,
	val password: String
)