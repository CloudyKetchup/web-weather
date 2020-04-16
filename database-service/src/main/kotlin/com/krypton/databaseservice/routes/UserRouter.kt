package com.krypton.databaseservice.routes

import com.krypton.commonmodels.user.User
import com.krypton.databaseservice.repository.UserRepository
import kotlinx.coroutines.reactive.awaitSingle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.server.*
import org.springframework.web.reactive.function.server.ServerResponse.*
import reactor.kotlin.core.publisher.switchIfEmpty
import java.util.*

/**
 * User router, basically just a wrapper around actual router
 * with only the role of repository injection into [UserHandler]
 * */
@Service
class UserRouter @Autowired constructor(userRepository : UserRepository)
{
	private val handler = UserHandler(userRepository)

	val router = coRouter { "/user".nest {
		accept(APPLICATION_JSON).nest {
			POST("/save", handler::save)
		}
		GET("/get", handler::get)
		GET("/all") { handler.all() }
		DELETE("/delete", handler::delete)
	}}
}

/**
 * Action handler for incoming requests
 * */
class UserHandler(private val userRepository : UserRepository)
{
	/**
	 * Save user to database
	 *
	 * @param request	incoming request
	 * @return response with saved [User]
	 * */
	suspend fun save(request : ServerRequest) : ServerResponse
	{
		val user = userRepository.save(request.awaitBody<User>()).awaitSingle()

		return ok().contentType(APPLICATION_JSON).bodyValueAndAwait(user)
	}

	/**
	 * Get all users
	 *
	 * @return response with [User] list
	 * */
	suspend fun all() : ServerResponse
	{
		val users = userRepository.findAll().collectList().awaitSingle()

		return ok().contentType(APPLICATION_JSON).bodyValueAndAwait(users)
	}

	/**
	 * Find [User] by id
	 *
	 * @param request	incoming request
	 * @return response with [User] or empty if not found
	 * */
	suspend fun get(request : ServerRequest) : ServerResponse
	{
		val id = request.queryParam("id")

		if (id.isPresent && id.get().isNotEmpty())
		{
			return userRepository.findById(UUID.fromString(id.get()))
				.flatMap { ok().contentType(APPLICATION_JSON).bodyValue(it) }
				.switchIfEmpty { notFound().build() }
				.awaitSingle()
		}
		return badRequest().bodyValueAndAwait("id param null")
	}

	/**
	 * Delete user by id
	 *
	 * @param request	incoming request
	 * @return empty response or not found one
	 * */
	suspend fun delete(request : ServerRequest) : ServerResponse
	{
		val id = request.queryParam("id")

		if (id.isPresent && id.get().isNotEmpty())
		{
			return userRepository.findById(UUID.fromString(id.get()))
				.flatMap { noContent().build(userRepository.delete(it)) }
				.switchIfEmpty { notFound().build() }
				.awaitSingle()
		}
		return status(HttpStatus.BAD_REQUEST).bodyValueAndAwait("id param null")
	}
}