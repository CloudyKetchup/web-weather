package com.krypton.accountservice.service.account

import com.krypton.accountservice.model.AuthResponse
import com.krypton.accountservice.service.validator.RegistrationData
import reactor.core.publisher.Mono

interface IAccountService
{
	fun register(name : String, email : String, password : String) : Mono<AuthResponse>

	fun register(registrationData : RegistrationData) : Mono<AuthResponse>

	fun login(email : String, password : String) : Mono<AuthResponse>
}