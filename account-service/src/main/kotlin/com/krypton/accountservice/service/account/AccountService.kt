package com.krypton.accountservice.service.account

import com.krypton.accountservice.client.UserClient
import com.krypton.accountservice.model.AuthResponse
import com.krypton.accountservice.service.validator.RegistrationData
import com.krypton.commonmodels.user.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers

@Service
class AccountService @Autowired constructor(private val userClient : UserClient) : IAccountService
{
	override fun register(name : String, email : String, password: String) : Mono<AuthResponse>
	{
		return userClient.nameAndEmailNotUsed(name, email)
			.subscribeOn(Schedulers.elastic())
			// check if name and email are not already taken
			// in that case everything below flat map will not run
			// and we return auth response with message,
			.flatMap { when (it)
			{
				// if response any of this messages, return auth response
				"name used",
				"email used",
				"invalid query" -> Mono.just(AuthResponse(it, HttpStatus.BAD_REQUEST.toString()))
				// in case that everything is valid we return empty mono
				else -> Mono.empty()
			}}
			// if returned empty mono -> save user to database
			.switchIfEmpty(userClient.save(User(
				name = name,
				email = email,
				password = password
			// transform to success auth response
			)).map {
				AuthResponse("Registered", HttpStatus.OK.toString(), it)
			})
			// if not saved to database return fail auth response
			.switchIfEmpty(Mono.just(AuthResponse(
				"Not Registered",
				HttpStatus.INTERNAL_SERVER_ERROR.toString())
			))
	}

	override fun register(registrationData : RegistrationData) : Mono<AuthResponse>
	{
		return register(registrationData.name, registrationData.email, registrationData.password)
	}

	override fun login(email : String, password : String) : Mono<AuthResponse>
	{
		return userClient.getAsLogin(email, password)
			.map {
				if (it.user == null)
					AuthResponse(it.message, HttpStatus.UNAUTHORIZED.toString())
				else
					AuthResponse("Authorized", HttpStatus.OK.toString(), it.user)
			}
			.switchIfEmpty(Mono.just(AuthResponse("Error happened", HttpStatus.INTERNAL_SERVER_ERROR.toString())))
	}
}