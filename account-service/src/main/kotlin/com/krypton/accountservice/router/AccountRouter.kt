package com.krypton.accountservice.router

import com.krypton.accountservice.model.AuthResponse
import com.krypton.accountservice.model.RegisterDataWithValidation
import com.krypton.accountservice.service.account.IAccountService
import com.krypton.accountservice.service.validator.RegistrationData
import com.krypton.accountservice.validator.RegistrationValidator.*
import kotlinx.coroutines.reactive.awaitSingle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.badRequest
import org.springframework.web.reactive.function.server.ServerResponse.ok
import reactor.core.publisher.Mono

@Component
class AccountRouter @Autowired constructor(accountService : IAccountService)
{
	val handler = AccountHandler(accountService)

	val router = coRouter {
		"/account".nest {
			POST("/register", handler::register)
			GET("/login", handler::login)
		}
	}
}

class AccountHandler(private val accountService : IAccountService)
{
	suspend fun register(request : ServerRequest) : ServerResponse
	{
		return request.bodyToMono<RegistrationData>()
			.map { RegisterDataWithValidation(validateRegistration(it), it) }
			.flatMap { accountService.register(it) }
			.flatMap { ok().bodyValue(it) }
			.awaitSingle()
	}

	suspend fun login(request : ServerRequest) : ServerResponse
	{
		val email = request.queryParam("email")
		val password = request.queryParam("password")

		if (email.isPresent && password.isPresent)
		{
			val loginResult = accountService.login(email.get(), password.get())

			return ok().bodyValueAndAwait(loginResult.awaitSingle())
		}
		return badRequest().bodyValueAndAwait("invalid query")
	}

	private fun validateRegistration(registrationData : RegistrationData) : ValidationResult
	{
		return emailValid()
			.and(nickValid())
			.and(passwordValid())
			.apply(registrationData)
	}
}

private fun IAccountService.register(registerDataWithValidation : RegisterDataWithValidation) : Mono<AuthResponse>
{
	return if (registerDataWithValidation.validation == ValidationResult.SUCCESS)
	{
		register(registerDataWithValidation.registrationData)
	} else
	{
		Mono.just(AuthResponse(registerDataWithValidation.validation.value, HttpStatus.UNAUTHORIZED.toString()))
	}
}
