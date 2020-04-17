package com.krypton.accountservice.client

import com.krypton.commonmodels.auth.LoginUser
import com.krypton.commonmodels.user.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient

@Service
class UserClient @Autowired constructor(private val webClientBuilder : WebClient.Builder)
{
	private val client : WebClient = webClientBuilder.baseUrl("http://database-service:8200/user").build()

	fun save(user : User) = client.post()
		.uri("/save")
		.body(BodyInserters.fromValue(user))
		.retrieve()
		.bodyToMono(User::class.java)

	fun get(id : String) = client.get()
		.uri("/get?id=$id")
		.retrieve()
		.bodyToMono(User::class.java)

	fun getByName(name : String) = client.get()
		.uri("/get?name=$name")
		.retrieve()
		.bodyToMono(User::class.java)

	fun getAsLogin(email : String, password : String) = client.get()
		.uri("/get/as/login?email=$email&password=$password")
		.retrieve()
		.bodyToMono(LoginUser::class.java)

	fun delete(id : String) = client.delete()
		.uri("/delete?id=$id")
		.retrieve()
		.bodyToMono(Unit::class.java)

	fun all() = client.get()
		.uri("/all")
		.retrieve()
		.bodyToFlux(User::class.java)

	fun nameAndEmailNotUsed(name : String, email : String) = client.get()
		.uri("/name-and-email-valid?name=$name&email=$email")
		.retrieve()
		.bodyToMono(String::class.java)
}